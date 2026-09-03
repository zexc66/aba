import * as contentful from "contentful";
import { COPY, type Content } from "../data";

export type Locale = "en" | "ar" | "fr";

interface CMSConfig {
  space: string;
  accessToken: string;
  environment: string;
}

interface ContentfulSiteSettings {
  contentData: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (!isRecord(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return (prototype === Object.prototype || prototype === null) && !("$$typeof" in value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function warnInvalidSection(path: string, reason: string): void {
  console.warn(`CMS: Invalid ${path} (${reason}). Using static fallback for this section.`);
}

function isSiteSettings(fields: unknown): fields is ContentfulSiteSettings {
  return isRecord(fields) && "contentData" in fields && isRecord(fields.contentData);
}

function isProgramPatch(value: unknown): value is Record<string, unknown> {
  if (!isPlainRecord(value)) return false;

  const expectedKeys = ["name", "desc", "tags", "slug", "status", "detail"];
  if (!expectedKeys.some((key) => key in value)) return false;
  if ("name" in value && !isNonEmptyString(value.name)) return false;
  if ("desc" in value && !isNonEmptyString(value.desc)) return false;
  if ("slug" in value && !isNonEmptyString(value.slug)) return false;
  if ("status" in value && !isNonEmptyString(value.status)) return false;

  if ("tags" in value) {
    if (!Array.isArray(value.tags) || value.tags.length === 0 || !value.tags.every(isNonEmptyString)) return false;
  }

  if ("detail" in value) {
    if (!isPlainRecord(value.detail)) return false;
    if ("overview" in value.detail && !isNonEmptyString(value.detail.overview)) return false;
    if ("highlights" in value.detail) {
      if (!Array.isArray(value.detail.highlights) || value.detail.highlights.length === 0) return false;
      if (!value.detail.highlights.every((highlight) => {
        if (!isPlainRecord(highlight)) return false;
        return Object.keys(highlight).some((key) => key === "title" || key === "desc");
      })) return false;
    }
  }

  return true;
}

function isProgramItem(value: unknown): value is Content["programs"]["list"][number] {
  if (!isPlainRecord(value)) return false;
  if (!isNonEmptyString(value.name) || !isNonEmptyString(value.desc)) return false;
  if (!Array.isArray(value.tags) || value.tags.length === 0 || !value.tags.every(isNonEmptyString)) return false;
  if (!isNonEmptyString(value.slug) || !isNonEmptyString(value.status)) return false;
  if (!isPlainRecord(value.detail) || !isNonEmptyString(value.detail.overview)) return false;
  if (!Array.isArray(value.detail.highlights) || value.detail.highlights.length === 0) return false;
  return value.detail.highlights.every((highlight) =>
    isPlainRecord(highlight) && isNonEmptyString(highlight.title) && isNonEmptyString(highlight.desc)
  );
}

function isValidPrograms(value: unknown): value is Content["programs"] {
  return isPlainRecord(value)
    && isNonEmptyString(value.title)
    && Array.isArray(value.list)
    && value.list.length > 0
    && value.list.every(isProgramItem);
}

function isValidNav(value: unknown): boolean {
  return isPlainRecord(value) && isNonEmptyString(value.about) && isNonEmptyString(value.programs);
}

function isValidHero(value: unknown): boolean {
  return isPlainRecord(value) && isNonEmptyString(value.title) && isNonEmptyString(value.subtitle);
}

/** Merge known static keys while retaining defaults for invalid CMS sections. */
export function mergeContent<T>(fallback: T, remote: unknown, path = "content"): T {
  if (Array.isArray(fallback)) {
    if (!Array.isArray(remote)) {
      if (remote !== undefined && remote !== null) warnInvalidSection(path, "expected an array");
      return fallback;
    }
    if (remote.length === 0) {
      warnInvalidSection(path, "array must not be empty");
      return fallback;
    }
    if (fallback.length === 0 || remote.length > fallback.length) {
      warnInvalidSection(path, "unexpected array shape");
      return fallback;
    }
    if (path === "content.programs.list" && !remote.every(isProgramPatch)) {
      warnInvalidSection(path, "one or more program items are malformed");
      return fallback;
    }

    return fallback.map((value, index) => {
      const remoteValue = remote[index];
      if (remoteValue === undefined || remoteValue === null) {
        if (remoteValue === null) warnInvalidSection(`${path}[${index}]`, "null item");
        return value;
      }
      return mergeContent(value, remoteValue, `${path}[${index}]`);
    }) as T;
  }

  if (isPlainRecord(fallback)) {
    const source = isPlainRecord(remote) ? remote : {};
    if (remote !== undefined && remote !== null && !isPlainRecord(remote)) {
      warnInvalidSection(path, "expected an object");
    }
    const merged: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fallback)) {
      if (!(key in source)) {
        merged[key] = value;
      } else if (source[key] === undefined || source[key] === null) {
        warnInvalidSection(`${path}.${key}`, "missing value");
        merged[key] = value;
      } else {
        merged[key] = mergeContent(value, source[key], `${path}.${key}`);
      }
    }
    return merged as T;
  }

  // Non-plain object defaults include ReactNode icons. CMS JSON cannot safely
  // replace them, so retain the static value rather than accepting an object
  // with an incompatible runtime shape.
  if (typeof fallback === "object" && fallback !== null) {
    if (remote !== undefined && remote !== null) warnInvalidSection(path, "unsupported object value");
    return fallback;
  }

  if (
    remote === undefined ||
    remote === null ||
    typeof remote !== typeof fallback ||
    (typeof fallback === "string" && !isNonEmptyString(remote))
  ) {
    if (remote !== undefined && remote !== null) warnInvalidSection(path, "expected a non-empty value");
    return fallback;
  }
  return remote as T;
}

export function mergeCmsContent(locale: Locale, remote: unknown): Content {
  const fallback = COPY[locale];
  const merged = mergeContent(fallback, remote);
  const safeContent = { ...merged };

  if (!isValidPrograms(safeContent.programs)) {
    warnInvalidSection("content.programs", "required program list is invalid");
    safeContent.programs = fallback.programs;
  }
  if (!isValidNav(safeContent.nav)) {
    warnInvalidSection("content.nav", "required navigation fields are invalid");
    safeContent.nav = fallback.nav;
  }
  if (!isValidHero(safeContent.hero)) {
    warnInvalidSection("content.hero", "required hero fields are invalid");
    safeContent.hero = fallback.hero;
  }
  if (!isNonEmptyString(safeContent.metaTitle)) {
    warnInvalidSection("content.metaTitle", "required title is invalid");
    safeContent.metaTitle = fallback.metaTitle;
  }

  return safeContent;
}

class CMSService {
  private client: contentful.ContentfulClientApi<undefined> | null = null;
  private isConfigured = false;

  constructor() {
    this.initClient();
  }

  get configured(): boolean {
    return this.isConfigured;
  }
  private initClient() {
    const env = import.meta.env ?? {};
    const space = env.VITE_CONTENTFUL_SPACE_ID;
    const accessToken = env.VITE_CONTENTFUL_ACCESS_TOKEN;
    const environment = env.VITE_CONTENTFUL_ENVIRONMENT || "master";

    if (space && accessToken) {
      this.client = contentful.createClient({
        space,
        accessToken,
        environment,
      });
      this.isConfigured = true;
    } else {
      if (env.DEV) {
        console.warn(
          "CMS: Contentful keys not detected in environment. Falling back to local/mock data."
        );
      }
    }
  }

  async getWebsiteContent(locale: Locale = "en"): Promise<(typeof COPY)["en"]> {
    if (!this.isConfigured || !this.client) {
      return COPY[locale];
    }

    try {
      const contentfulLocale =
        locale === "en" ? "en-US" : locale === "ar" ? "ar-SA" : "fr-FR";

      const response = await this.client.getEntries({
        content_type: "siteSettings",
        locale: contentfulLocale,
        limit: 1,
      });

      if (response.items && response.items.length > 0) {
        const fields = response.items[0].fields;

        if (isSiteSettings(fields)) {
          return mergeCmsContent(locale, fields.contentData);
        }

        console.error(
          "CMS: 'siteSettings' entry is missing expected 'contentData' field. Using local data."
        );
      }

      throw new Error("Contentful entries empty or malformed");
    } catch (error) {
      console.error(
        "Failed to fetch from Contentful. Falling back to static data.",
        error
      );
      return COPY[locale];
    }
  }

  async getCollection(contentTypeId: string, locale: Locale = "en") {
    if (!this.isConfigured || !this.client) {
      return [];
    }
    const contentfulLocale =
      locale === "en" ? "en-US" : locale === "ar" ? "ar-SA" : "fr-FR";
    try {
      const response = await this.client.getEntries({
        content_type: contentTypeId,
        locale: contentfulLocale,
      });
      return response.items;
    } catch (err) {
      console.error(`Failed to fetch collection ${contentTypeId}:`, err);
      return [];
    }
  }
}

export const cms = new CMSService();
