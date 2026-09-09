/** Preserve the locale URL namespace for full-page internal links. Hash links
 * intentionally pass through unchanged so homepage section navigation remains
 * local and does not become /ar#about or /fr#about. */
export const DEPLOY_BASE_PATH = (
  (import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env?.BASE_URL ??
  "/"
).replace(/\/$/, "");

function withDeployBase(path: string): string {
  if (
    !DEPLOY_BASE_PATH ||
    !path.startsWith("/") ||
    path.startsWith(`${DEPLOY_BASE_PATH}/`) ||
    path === DEPLOY_BASE_PATH
  )
    return path;
  return `${DEPLOY_BASE_PATH}${path}`;
}

export function deployAssetPath(path: string): string {
  return withDeployBase(path);
}

export function localizedPath(path: string, locale: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  let localized = path;
  if (locale === "ar" || locale === "fr") {
    if (path !== `/${locale}` && !path.startsWith(`/${locale}/`))
      localized = path === "/" ? `/${locale}/` : `/${locale}${path}`;
  }
  return withDeployBase(localized);
}

/** Wouter's nested Router prepends its base to Link targets. The `~` escape
 * keeps an already-localized absolute path from becoming /ar/ar/route. */
export function localizedLinkPath(path: string, locale: string): string {
  const absolute = localizedPath(path, locale);
  return absolute.startsWith("/") && !absolute.startsWith("//")
    ? `~${absolute}`
    : absolute;
}
