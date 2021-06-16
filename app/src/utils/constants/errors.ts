export const Errors = {
  INVALID_INPUT_ERROR: 'InvalidInputError',
  INCORRECT_CREDENCIALS_ERROR: 'IncorrectCredentialsError',
  EMAIL_CONFLICT_ERROR: 'EmailConflictError',
  SEND_MAIL_ERROR: 'SendMailError',
  INVALID_SESSION_ERROR: 'InvalidSessionError',
  INVALID_TOKEN_ERROR: 'InvalidTokenError',
  INVALID_LINK_ERROR: 'InvalidLinkError',
  USER_NOT_FOUND_ERROR: 'UserNotFoundError',
  NOT_FOUND_ERROR: 'NotFoundError',
  SIGN_UP_METHOD_ERROR: 'SignUpMethodError',
  EMAIL_VERIFICATION_ERROR: 'EmailVerificationError',
  UPLOAD_IMAGE_ERROR: 'UploadImageError',
  PASSWORD_MATCHED_ERROR: 'PasswordMatchedError',
  MAXIMUM_IDEAS_EXCEEDED_ERROR: 'MaximumIdeasExceededError',
} as const

export const ErrorResults = {
  INVALID_INPUT_ERROR: { InvalidInputError: {} },
  INCORRECT_CREDENCIALS_ERROR: { IncorrectCredentialsError: {} },
  EMAIL_CONFLICT_ERROR: { EmailConflictError: {} },
  SEND_MAIL_ERROR: { SendMailError: {} },
  INVALID_SESSION_ERROR: { InvalidSessionError: {} },
  INVALID_TOKEN_ERROR: { InvalidTokenError: {} },
  INVALID_LINK_ERROR: { InvalidLinkError: {} },
  USER_NOT_FOUND_ERROR: { UserNotFoundError: {} },
  NOT_FOUND_ERROR: { NotFoundError: {} },
  SIGN_UP_METHOD_ERROR: (errorMessage: string) => {
    return {
      SignUpMethodError: {
        message: errorMessage,
      },
    }
  },
  EMAIL_VERIFICATION_ERROR: { EmailVerificationError: {} },
  UPLOAD_IMAGE_ERROR: { UploadImageError: {} },
  PASSWORD_MATCHED_ERROR: { PasswordMatchedError: {} },
  MAXIMUM_IDEAS_EXCEEDED_ERROR: { MaximumIdeasExceededError: {} },
} as const

export type Error = typeof Errors[keyof typeof Errors]
