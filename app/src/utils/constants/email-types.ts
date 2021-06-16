export const EmailTypes = {
  VERIFY_EMAIL: 0,
  RESET_PASSWORD: 1,
} as const

export type EmailType = typeof EmailTypes[keyof typeof EmailTypes]
