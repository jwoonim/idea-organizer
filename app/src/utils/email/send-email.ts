import nodemailer from 'nodemailer'

import { Secrets, EmailType, EmailTypes } from 'src/utils/constants'
import {
  getEmailVerificationEmailTemplate,
  getResetPasswordEmailTemplate,
} from './templates'

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: Secrets.GMAIL_ACCOUNT,
    pass: Secrets.GMAIL_ACCOUNT_APP_PASS,
  },
})

export const sendEmail = async (
  to: string,
  url: string,
  name: string,
  emailType: EmailType
): Promise<any> => {
  try {
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
  } catch (error) {
    console.log(error)
  }
}