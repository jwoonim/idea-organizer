import { google } from 'googleapis'
import nodemailer from 'nodemailer'

import { Secrets, EmailType, EmailTypes } from 'src/utils/constants'
import {
  getEmailVerificationEmailTemplate,
  getResetPasswordEmailTemplate,
} from './templates'

const OAuth2 = google.auth.OAuth2
const oauth2Client = new OAuth2(
  Secrets.GOOGLE_CLIENT_ID,
  Secrets.GOOGLE_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
)

export const sendEmail = async (
  to: string,
  url: string,
  name: string,
  emailType: EmailType
): Promise<any> => {
  // Set refresh token and get access token
  oauth2Client.setCredentials({ refresh_token: Secrets.OAUTH_REFRESH_TOKEN })
  const accessToken = await oauth2Client.getAccessToken()

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: Secrets.GMAIL_ACCOUNT,
      clientId: Secrets.GOOGLE_CLIENT_ID,
      clientSecret: Secrets.GOOGLE_CLIENT_SECRET,
      refreshToken: Secrets.OAUTH_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  })

  let subject, template
  if (emailType === EmailTypes.VERIFY_EMAIL) {
    subject = 'IO - Email verification'
    template = getEmailVerificationEmailTemplate(name, url)
  } else if (emailType === EmailTypes.RESET_PASSWORD) {
    subject = 'IO - Reset password'
    template = getResetPasswordEmailTemplate(name, url)
  }

  const mailOptions = {
    from: Secrets.GMAIL_ACCOUNT,
    to: to,
    subject: subject,
    generateTextFromHTML: true,
    html: template,
  }

  return await smtpTransport.sendMail(mailOptions)
}
