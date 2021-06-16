export const SignUpMethods = {
  EMAIL: 'Email',
  GOOGLE: 'Google',
} as const

export type SignUpMethod = typeof SignUpMethods[keyof typeof SignUpMethods]
