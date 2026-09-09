import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

import inquiryHandler from "../api/inquiry.ts";
import vaultAuthHandler from "../api/vault/auth.ts";
import vaultDocumentsHandler from "../api/vault/documents.ts";
import vaultDocumentHandler from "../api/vault/documents/[name].ts";

const ROOT = process.cwd();
const READINESS_SCRIPT = path.join(
  ROOT,
  "scripts",
  "check-vercel-readiness.mjs"
);
const PROVIDER_URL = "https://hooks.example.invalid/lead";
const PROVIDER_SECRET = "re_test_secret_must_not_leak";
const PROVIDER_RESPONSE_BODY = "provider response body must not leak";
const INQUIRY_CONTENT = "synthetic inquiry content must not leak";
const ENV_NAMES = [
  "VERCEL",
  "RESEND_API_KEY",
  "LEAD_NOTIFY_EMAIL",
  "LEAD_FROM_EMAIL",
  "LEAD_WEBHOOK_URL",
  "PUBLIC_APP_ORIGIN",
  "VAULT_ACCESS_KEYS",
  "VAULT_SESSION_SECRET",
  "VAULT_STORAGE_MODE",
  "VAULT_DATA_ROOM_DIR",
  "VAULT_STORAGE_SENTINEL",
];

type MockResult = {
  statusCode: number | undefined;
  body: unknown;
  headers: Record<string, string>;
};

type MockResponse = {
  setHeader(name: string, value: string): MockResponse;
  status(code: number): MockResponse;
  json(payload: unknown): void;
  end(): void;
  send(payload: unknown): void;
};

type FetchCall = { url: string; body: string };

function mockResponse(): { response: MockResponse; result: MockResult } {
  const result: MockResult = {
    statusCode: undefined,
    body: undefined,
    headers: {},
  };
  const response: MockResponse = {
    setHeader(name, value) {
      result.headers[name] = value;
      return response;
    },
    status(code) {
      result.statusCode = code;
      return response;
    },
    json(payload) {
      result.body = payload;
    },
    end() {},
    send(payload) {
      result.body = payload;
    },
  };
  return { response, result };
}

function request(body: unknown, ip: string) {
  return {
    method: "POST",
    body,
    headers: { "x-real-ip": ip },
  };
}

function validInquiry() {
  return {
    type: "GENERAL",
    email: "synthetic@example.invalid",
    name: "Synthetic Contact",
    organization: "Synthetic Organization",
    consent: true,
    locale: "en",
    message: INQUIRY_CONTENT,
  };
}

function setEnvironment(
  values: Record<string, string | undefined>
): Map<string, string | undefined> {
  const previous = new Map(ENV_NAMES.map(name => [name, process.env[name]]));
  for (const name of ENV_NAMES) delete process.env[name];
  for (const [name, value] of Object.entries(values)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
  return previous;
}

function restoreEnvironment(previous: Map<string, string | undefined>): void {
  for (const name of ENV_NAMES) {
    const value = previous.get(name);
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
}

async function withEnvironment<T>(
  values: Record<string, string | undefined>,
  fn: () => Promise<T>
): Promise<T> {
  const previous = setEnvironment(values);
  try {
    return await fn();
  } finally {
    restoreEnvironment(previous);
  }
}

async function withFetch<T>(
  implementation: (call: FetchCall) => Promise<Response>,
  fn: (calls: FetchCall[]) => Promise<T>
): Promise<T> {
  const originalFetch = globalThis.fetch;
  const calls: FetchCall[] = [];
  globalThis.fetch = async (input, init) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url;
    calls.push({ url, body: typeof init?.body === "string" ? init.body : "" });
    return implementation(calls.at(-1)!);
  };
  try {
    return await fn(calls);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function captureDiagnostics<T>(
  fn: () => Promise<T>
): Promise<{ value: T; messages: string[] }> {
  const messages: string[] = [];
  const original = {
    log: console.log,
    warn: console.warn,
    error: console.error,
  };
  const capture = (...args: unknown[]) => {
    messages.push(
      args
        .map(arg => (typeof arg === "string" ? arg : "[non-string diagnostic]"))
        .join(" ")
    );
  };
  console.log = capture;
  console.warn = capture;
  console.error = capture;
  try {
    const value = await fn();
    await new Promise<void>(resolve => setImmediate(resolve));
    return { value, messages };
  } finally {
    console.log = original.log;
    console.warn = original.warn;
    console.error = original.error;
  }
}

function assertSafePublicOutput(
  result: MockResult,
  diagnostics: string[]
): void {
  const output = `${JSON.stringify(result.body)}\n${diagnostics.join("\n")}`;
  for (const sensitiveValue of [
    PROVIDER_URL,
    PROVIDER_SECRET,
    PROVIDER_RESPONSE_BODY,
    INQUIRY_CONTENT,
    "synthetic@example.invalid",
  ]) {
    assert.equal(
      output.includes(sensitiveValue),
      false,
      "public response or diagnostics leaked sensitive data"
    );
  }
}

function providerResponse(ok: boolean, status = ok ? 200 : 500): Response {
  return { ok, status, body: PROVIDER_RESPONSE_BODY } as unknown as Response;
}

async function testInquiryDelivery(): Promise<void> {
  await withEnvironment(
    {
      RESEND_API_KEY: PROVIDER_SECRET,
      LEAD_NOTIFY_EMAIL: "inbox@example.invalid",
    },
    async () => {
      const captured = await captureDiagnostics(() =>
        withFetch(
          async () => providerResponse(true),
          async calls => {
            const { response, result } = mockResponse();
            await inquiryHandler(
              request(validInquiry(), "198.51.100.10"),
              response
            );
            assert.equal(result.statusCode, 200);
            assert.deepEqual(
              result.body && typeof result.body === "object"
                ? { success: (result.body as { success?: boolean }).success }
                : result.body,
              { success: true }
            );
            assert.ok(calls.length >= 1, "Resend delivery was not attempted");
            assert.equal(calls[0]?.url, "https://api.resend.com/emails");
            assert.ok(
              calls[0]?.body.includes(INQUIRY_CONTENT),
              "mock delivery did not receive the inquiry payload"
            );
            return { result, calls };
          }
        )
      );
      assertSafePublicOutput(captured.value.result, captured.messages);
    }
  );
}

async function testInvalidInquiry(): Promise<void> {
  await withEnvironment({}, async () => {
    const captured = await captureDiagnostics(() =>
      withFetch(
        async () => {
          throw new Error("fetch must not be called for invalid input");
        },
        async calls => {
          const { response, result } = mockResponse();
          await inquiryHandler(
            request(
              {
                email: "not-an-email",
                consent: true,
                message: INQUIRY_CONTENT,
              },
              "198.51.100.11"
            ),
            response
          );
          assert.equal(result.statusCode, 400);
          assert.equal(calls.length, 0);
          return result;
        }
      )
    );
    assertSafePublicOutput(captured.value, captured.messages);
  });
}

async function testNoProvider(): Promise<void> {
  await withEnvironment({}, async () => {
    const captured = await captureDiagnostics(() =>
      withFetch(
        async () => {
          throw new Error("fetch must not be called without a provider");
        },
        async calls => {
          const { response, result } = mockResponse();
          await inquiryHandler(
            request(validInquiry(), "198.51.100.12"),
            response
          );
          assert.equal(result.statusCode, 503);
          assert.equal(calls.length, 0);
          return result;
        }
      )
    );
    assertSafePublicOutput(captured.value, captured.messages);
  });
}

async function testResendFailure(): Promise<void> {
  await withEnvironment(
    {
      RESEND_API_KEY: PROVIDER_SECRET,
      LEAD_NOTIFY_EMAIL: "inbox@example.invalid",
    },
    async () => {
      const captured = await captureDiagnostics(() =>
        withFetch(
          async () => providerResponse(false, 502),
          async calls => {
            const { response, result } = mockResponse();
            await inquiryHandler(
              request(validInquiry(), "198.51.100.13"),
              response
            );
            assert.equal(result.statusCode, 503);
            assert.equal(calls.length, 1);
            return result;
          }
        )
      );
      assertSafePublicOutput(captured.value, captured.messages);
    }
  );
}

async function testWebhookDeliveryAndFailure(): Promise<void> {
  await withEnvironment({ LEAD_WEBHOOK_URL: PROVIDER_URL }, async () => {
    const success = await captureDiagnostics(() =>
      withFetch(
        async () => providerResponse(true, 204),
        async calls => {
          const { response, result } = mockResponse();
          await inquiryHandler(
            request(validInquiry(), "198.51.100.14"),
            response
          );
          assert.equal(result.statusCode, 200);
          assert.equal(calls.length, 1);
          assert.equal(calls[0]?.url, PROVIDER_URL);
          return result;
        }
      )
    );
    assertSafePublicOutput(success.value, success.messages);

    const failure = await captureDiagnostics(() =>
      withFetch(
        async () => {
          const timeout = new Error("simulated provider timeout");
          timeout.name = "AbortError";
          throw timeout;
        },
        async calls => {
          const { response, result } = mockResponse();
          await inquiryHandler(
            request(validInquiry(), "198.51.100.15"),
            response
          );
          assert.equal(result.statusCode, 503);
          assert.equal(calls.length, 1);
          return result;
        }
      )
    );
    assertSafePublicOutput(failure.value, failure.messages);
  });
}

function runReadiness(
  args: string[],
  values: Record<string, string | undefined>
) {
  const env = { ...process.env };
  for (const name of ENV_NAMES) delete env[name];
  for (const [name, value] of Object.entries(values)) {
    if (value === undefined) delete env[name];
    else env[name] = value;
  }
  return spawnSync(process.execPath, [READINESS_SCRIPT, ...args], {
    cwd: ROOT,
    env,
    encoding: "utf8",
  });
}

function testReadinessChecker(): void {
  const missing = runReadiness([], { VERCEL: "1" });
  assert.equal(missing.status, 1);
  assert.ok(missing.stdout.includes("BLOCKED"));

  const allowed = runReadiness(["--allow-empty"], { VERCEL: "1" });
  assert.equal(allowed.status, 0);
  assert.ok(allowed.stdout.includes("READY"));

  const mocked = runReadiness(["--mock"], {
    VERCEL: "1",
    RESEND_API_KEY: PROVIDER_SECRET,
    LEAD_NOTIFY_EMAIL: "inbox@example.invalid",
    LEAD_FROM_EMAIL: "sender@example.invalid",
    LEAD_WEBHOOK_URL: PROVIDER_URL,
  });
  assert.equal(mocked.status, 0);
  assert.ok(mocked.stdout.includes("READY"));
  assert.equal(mocked.stdout.includes(PROVIDER_SECRET), false);
  assert.equal(mocked.stdout.includes(PROVIDER_URL), false);

  const insecureWebhook = runReadiness([], {
    VERCEL: "1",
    LEAD_WEBHOOK_URL: "http://hooks.example.invalid/lead",
  });
  assert.equal(insecureWebhook.status, 1);
  assert.ok(insecureWebhook.stdout.includes("must use HTTPS"));
}

function source(pathname: string): string {
  return readFileSync(path.join(ROOT, pathname), "utf8");
}

function testPublicBoundarySources(): void {
  const app = source("client/src/App.tsx");
  const header = source("client/src/components/home/Header.tsx");
  const unavailable = source("client/src/pages/DeploymentUnavailable.tsx");
  const prerender = source("scripts/prerender.mjs");
  const sitemap = source("scripts/generate-sitemap.mjs");
  const routes = source("scripts/routes.mjs");
  const localePath = source("client/src/localePath.ts");
  const viteConfig = source("vite.config.ts");
  const index = source("client/index.html");
  const vercel = source("vercel.json");

  assert.ok(app.includes('path={"/"}'), "root route is not represented");
  assert.ok(
    prerender.includes("all three locales (EN at the root, /ar/, /fr/)"),
    "public locale roots are not represented"
  );
  assert.ok(
    prerender.includes('{ code: "ar", prefix: "ar"'),
    "Arabic prerender route namespace is not represented"
  );
  assert.ok(
    prerender.includes('{ code: "fr", prefix: "fr"'),
    "French prerender route namespace is not represented"
  );
  assert.ok(
    prerender.includes(
      'route === "/" ? path.join(locale.prefix, "index.html")'
    ),
    "localized root output is not represented"
  );
  assert.ok(
    viteConfig.includes('base: process.env.VITE_BASE || "/"'),
    "deployment base path is not configured for /aba/"
  );
  assert.ok(
    localePath.includes("DEPLOY_BASE_PATH") &&
      localePath.includes("deployAssetPath"),
    "deployment asset helper is not represented for /aba/"
  );
  assert.ok(
    localePath.includes("env?.BASE_URL") &&
      localePath.includes("return `${DEPLOY_BASE_PATH}${path}`"),
    "base-relative assets do not use the deployment prefix"
  );
  for (const component of [
    "client/src/components/PageLoader.tsx",
    "client/src/components/home/Header.tsx",
    "client/src/components/home/Footer.tsx",
    "client/src/components/home/Hero.tsx",
  ]) {
    assert.ok(
      source(component).includes("deployAssetPath"),
      `${component} does not use base-relative assets`
    );
  }
  assert.ok(
    index.includes('href="%BASE_URL%rss.xml"'),
    "base-relative public asset/link is not represented"
  );
  assert.ok(
    routes.includes("export const PRIVATE_ROUTES = new Set("),
    "private route manifest is not defined in scripts/routes.mjs"
  );
  for (const route of [
    "/admin",
    "/investor-portal",
    "/investor-portal/vault",
  ]) {
    assert.ok(
      routes.includes(`"${route}"`),
      `private route ${route} is not named for filtering`
    );
  }
  assert.ok(
    routes.includes("export const publicRoutes = (isVercel) =>") &&
      routes.includes(
        "isVercel ? ALL_ROUTES.filter((route) => !PRIVATE_ROUTES.has(route)) : ALL_ROUTES;"
      ),
    "publicRoutes does not drop private routes on Vercel"
  );
  assert.ok(
    routes.includes(
      'export const SITEMAP_ROUTES = ALL_ROUTES.filter((route) => route !== "/404" && !PRIVATE_ROUTES.has(route));'
    ),
    "sitemap manifest does not exclude /404 and private routes"
  );
  assert.ok(
    routes.includes("export const sitemapRoutes = (isVercel) =>") &&
      routes.includes(
        "isVercel ? SITEMAP_ROUTES.filter((route) => !PRIVATE_ROUTES.has(route)) : SITEMAP_ROUTES;"
      ),
    "sitemapRoutes does not drop private routes on Vercel"
  );
  assert.ok(
    sitemap.includes('import { sitemapRoutes } from "./routes.mjs";'),
    "sitemap does not source routes from the shared manifest"
  );
  assert.ok(
    sitemap.includes("const ROUTES = sitemapRoutes(IS_VERCEL);"),
    "sitemap does not filter routes through sitemapRoutes"
  );
  assert.ok(
    prerender.includes('import { publicRoutes } from "./routes.mjs";'),
    "prerender does not source routes from the shared manifest"
  );
  assert.ok(
    prerender.includes("const ROUTES = publicRoutes(IS_VERCEL);"),
    "prerender does not filter routes through publicRoutes"
  );

  assert.ok(
    app.includes(
      "const InvestorLoginRoute = isVercelDeployment ? DeploymentUnavailable : InvestorLogin;"
    )
  );
  assert.ok(
    app.includes(
      "const VaultRoute = isVercelDeployment ? DeploymentUnavailable : Vault;"
    )
  );
  assert.ok(
    app.includes(
      "const AdminRoute = isVercelDeployment ? DeploymentUnavailable : Admin;"
    )
  );
  assert.ok(
    header.includes("!isVercelDeployment && <a"),
    "desktop investor link is not behind the Vercel boundary"
  );
  assert.ok(
    header.includes("!isVercelDeployment && <motion.a"),
    "mobile investor link is not behind the Vercel boundary"
  );
  assert.ok(
    unavailable.includes("VERCEL_PUBLIC_BOUNDARY") &&
      unavailable.includes("not available")
  );
  assert.equal(
    unavailable.includes("password") || unavailable.includes("fetch("),
    false,
    "unsupported page exposes private behavior"
  );
  assert.ok(vercel.includes('"outputDirectory": "dist/public"'));
}

async function testVercelVaultHandlers(): Promise<void> {
  await withEnvironment(
    { VERCEL: "1", VAULT_SESSION_SECRET: PROVIDER_SECRET },
    async () => {
      for (const handler of [
        vaultAuthHandler,
        vaultDocumentsHandler,
        vaultDocumentHandler,
      ]) {
        const { response, result } = mockResponse();
        const req =
          handler === vaultAuthHandler
            ? {
                method: "POST",
                body: {
                  email: "synthetic@example.invalid",
                  key: PROVIDER_SECRET,
                },
                headers: {},
              }
            : handler === vaultDocumentsHandler
              ? { method: "GET", body: undefined, headers: {} }
              : {
                  method: "GET",
                  body: undefined,
                  headers: {},
                  query: { name: "synthetic.txt" },
                };
        await handler(req, response);
        assert.equal(result.statusCode, 404);
        assert.deepEqual(result.body, {
          error:
            "This private route is not available on the public deployment.",
        });
        assert.equal(
          JSON.stringify(result.body).includes(PROVIDER_SECRET),
          false
        );
      }
    }
  );
}

async function main(): Promise<void> {
  const tests: Array<[string, () => Promise<void> | void]> = [
    [
      "inquiry delivery and safe failure paths",
      async () => {
        await testInquiryDelivery();
        await testInvalidInquiry();
        await testNoProvider();
        await testResendFailure();
        await testWebhookDeliveryAndFailure();
      },
    ],
    ["readiness checker", testReadinessChecker],
    ["public Vercel boundary sources", testPublicBoundarySources],
    ["Vercel vault handlers", testVercelVaultHandlers],
  ];

  for (const [name, test] of tests) {
    await test();
    console.log(`ok - ${name}`);
  }

  console.log(`Vercel flow checks passed (${tests.length} suites)`);
}

void main();
