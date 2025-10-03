const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    if (process.env.NODE_ENV === "production") {
      console.warn(`Missing environment variable: ${key}`);
    }
    return "";
  }
  return value;
};

export const APP_URL = getEnv("NEXT_PUBLIC_APP_URL");
export const BILLING_URL = getEnv("NEXT_PUBLIC_BILLING_URL");
export const SUPPORT_URL = getEnv("NEXT_PUBLIC_SUPPORT_URL");
export const CONTACT_EMAIL = getEnv("NEXT_PUBLIC_CONTACT_EMAIL");
export const YM_ID = getEnv("NEXT_PUBLIC_YM_ID");
