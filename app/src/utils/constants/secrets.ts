export const Secrets = {
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  REDIS_URL: process.env.REDIS_URL,
  EMAIL_VERIFICATION_URL: process.env.EMAIL_VERIFICATION_URL,
  RESET_PASSWORD_URL: process.env.RESET_PASSWORD_URL,
  SOCIAL_SIGN_UP_PASSWORD_KEY: process.env.SOCIAL_SIGN_UP_PASSWORD_KEY,
  GMAIL_ACCOUNT: process.env.GMAIL_ACCOUNT,
  GMAIL_ACCOUNT_APP_PASS: process.env.GMAIL_ACCOUNT_APP_PASS,
  GOOGLE_CLOUD_STORAGE_BUCKET: process.env.GOOGLE_CLOUD_STORAGE_BUCKET,
} as const

export type Secret = typeof Secrets[keyof typeof Secrets]
