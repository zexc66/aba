/** Preserve the locale URL namespace for full-page internal links. Hash links
 * intentionally pass through unchanged so homepage section navigation remains
 * local and does not become /ar#about or /fr#about. */
export function localizedPath(path: string, locale: string): string {
  if (!path.startsWith("/") || path.startsWith("//") || (locale !== "ar" && locale !== "fr")) return path;
  if (path === `/${locale}` || path.startsWith(`/${locale}/`)) return path;
  if (path === "/") return `/${locale}/`;
  return `/${locale}${path}`;
}

/** Wouter's nested Router prepends its base to Link targets. The `~` escape
 * keeps an already-localized absolute path from becoming /ar/ar/route. */
export function localizedLinkPath(path: string, locale: string): string {
  const absolute = localizedPath(path, locale);
  return absolute.startsWith("/") ? `~${absolute}` : absolute;
}
