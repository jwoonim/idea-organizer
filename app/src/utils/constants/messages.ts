export const Messages = {
  INCORRECT_CREDENTIALS_ERROR: 'Incorrect email or password.',
  INVALID_INPUT_ERROR: 'Please enter valid input.',
  INTERNAL_SERVER_ERROR: 'Something went wrong.',
  EMAIL_CONFLICT_ERROR: 'This email is already in use. Please use another one.',
  SEND_MAIL_ERROR: 'There was an error sending an email.',
  INVALID_SESSION_ERROR: 'This session has expired.',
  INVALID_TOKEN_ERROR: 'This token has expired.',
  INVALID_LINK_ERROR: 'This link has expired.',
  USER_NOT_FOUND_ERROR: 'User does not exist',
  NOT_FOUND_ERROR: 'Not found',
  GOOGLE_SIGN_UP_METHOD_ERROR:
    'You already signed up with us using an email address.',
  EMAIL_SIGN_UP_METHOD_ERROR:
    'You already signed up with us using your Google Account.',
  EMAIL_VERIFICATION_ERROR: 'There was an error verifying your email.',
  UPLOAD_IMAGE_ERROR: 'There was an error uploading your image.',
  PASSWORD_MATCHED_ERROR: "You can't use a password you have used recently.",
  MAXIMUM_IDEAS_EXCEEDED_ERROR: "You can't create more than 10 ideas.",
} as const

export type Message = typeof Messages[keyof typeof Messages]
