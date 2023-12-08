export const DEVELOPMENT_HOST = "localhost:3000";
export const PRODUCTION_HOST = "www.gregives.co.uk";

export const BASE_HOST =
  typeof window === "undefined"
    ? process.env.VERCEL_ENV === "production"
      ? PRODUCTION_HOST
      : process.env.VERCEL_BRANCH_URL
      ? process.env.VERCEL_BRANCH_URL
      : DEVELOPMENT_HOST
    : window.location.host;

export const BASE_ORIGIN =
  typeof window === "undefined"
    ? BASE_HOST === DEVELOPMENT_HOST
      ? `http://${BASE_HOST}`
      : `https://${BASE_HOST}`
    : window.location.origin;
