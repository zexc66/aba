/** Build-time deployment signals. Vercel exposes VERCEL=1 while the existing
 * BASE_URL signal continues to identify GitHub Pages/sub-path builds. */
const env = import.meta.env as ImportMetaEnv & { VERCEL?: boolean };

export const isVercelDeployment = env.VERCEL === true;

export const VERCEL_UNSUPPORTED_ROUTES = [
  "/admin",
  "/investor-portal",
  "/investor-portal/vault",
] as const;
