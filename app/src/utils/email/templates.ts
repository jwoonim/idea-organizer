export const getEmailVerificationEmailTemplate = (
  name: string,
  url: string
) => {
  return `
    <p>Hey ${name},</p>
    <p>Click the link below to verify your email address.</p>
    <a href=${url}>Verfiy email</a>    
  `
}

export const getResetPasswordEmailTemplate = (name: string, url: string) => {
  return `
    <p>Hey ${name},</p>
    <p>Click the link below to reset your password.</p>
    <a href=${url}>Reset password</a>    
  `
}
