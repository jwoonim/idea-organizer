import { objectType } from 'nexus'

import { Errors, Messages } from 'src/utils/constants'

/**
 * @name InvalidInputError
 * @prop {String} message - Error messsage
 * @description An object type.
 * @example
 * type InvalidInputError {
 *  message: String!
 * }
 */
export const InvalidInputError = objectType({
  name: Errors.INVALID_INPUT_ERROR,
  definition(t) {
    t.nonNull.string('message', {
      resolve: (data) => Messages.INVALID_INPUT_ERROR,
    })
  },
})
/**
 * @name IncorrectCredentialsError
 * @prop {String} message - Error messsage
 * @description An object type.
 * @example
 * type IncorrectCredentialsError {
 *  message: String!
 * }
 */
export const IncorrectCredentialsError = objectType({
  name: Errors.INCORRECT_CREDENCIALS_ERROR,
  definition(t) {
    t.nonNull.string('message', {
      resolve: (data) => Messages.INCORRECT_CREDENTIALS_ERROR,
    })
  },
})
/**
 * @name EmailConflictError
 * @prop {String} message - Error messsage
 * @description An object type.
 * @example
 * type EmailConflictError {
 *  message: String!
 * }
 */
export const EmailConflictError = objectType({
  name: Errors.EMAIL_CONFLICT_ERROR,
  definition(t) {
    t.nonNull.string('message', {
      resolve: (data) => Messages.EMAIL_CONFLICT_ERROR,
    })
  },
})
/**
 * @name SendMailError
 * @prop {String} message - Error messsage
 * @description An object type.
 * @example
 * type SendMailError {
 *  message: String!
 * }
 */
export const SendMailError = objectType({
  name: Errors.SEND_MAIL_ERROR,
  definition(t) {
    t.nonNull.string('message', {
      resolve: (data) => Messages.SEND_MAIL_ERROR,
    })
  },
})
/**
 * @name InvalidSessionError
 * @prop {String} message - Error messsage
 * @description An object type.
 * @example
 * type InvalidSessionError {
 *  message: String!
 * }
 */
export const InvalidSessionError = objectType({
  name: Errors.INVALID_SESSION_ERROR,
  definition(t) {
    t.nonNull.string('message', {
      resolve: (data) => Messages.INVALID_SESSION_ERROR,
    })
  },
})
/**
 * @name InvalidTokenError
 * @prop {String} message - Error messsage
 * @description An object type.
 * @example
 * type InvalidTokenError {
 *  message: String!
 * }
 */
export const InvalidTokenError = objectType({
  name: Errors.INVALID_TOKEN_ERROR,
  definition(t) {
    t.nonNull.string('message', {
      resolve: (data) => Messages.INVALID_TOKEN_ERROR,
    })
  },
})
/**
 * @name InvalidLinkError
 * @prop {String} message - Error messsage
 * @description An object type.
 * @example
 * type InvalidLinkError {
 *  message: String!
 * }
 */
export const InvalidLinkError = objectType({
  name: Errors.INVALID_LINK_ERROR,
  definition(t) {
    t.nonNull.string('message', {
      resolve: (data) => Messages.INVALID_LINK_ERROR,
    })
  },
})
/**
 * @name UserNotFoundError
 * @prop {String} message - Error messsage
 * @description An object type.
 * @example
 * type UserNotFoundError {
 *  message: String!
 * }
 */
export const UserNotFoundError = objectType({
  name: Errors.USER_NOT_FOUND_ERROR,
  definition(t) {
    t.nonNull.string('message', {
      resolve: (data) => Messages.USER_NOT_FOUND_ERROR,
    })
  },
})
/**
 * @name SignUpMethodError
 * @prop {String} message - Error messsage
 * @description An object type.
 * @example
 * type SignUpMethodError {
 *  message: String!
 * }
 */
export const SignUpMethodError = objectType({
  name: Errors.SIGN_UP_METHOD_ERROR,
  definition(t) {
    t.nonNull.string('message', {
      resolve: (data) => data.SignUpMethodError.message,
    })
  },
})
/**
 * @name EmailVerificationError
 * @prop {String} message - Error messsage
 * @description An object type.
 * @example
 * type EmailVerificationError {
 *  message: String!
 * }
 */
export const EmailVerificationError = objectType({
  name: Errors.EMAIL_VERIFICATION_ERROR,
  definition(t) {
    t.nonNull.string('message', {
      resolve: (data) => Messages.EMAIL_VERIFICATION_ERROR,
    })
  },
})
/**
 * @name NotFoundError
 * @prop {String} message - Error messsage
 * @description An object type.
 * @example
 * type NotFoundError {
 *  message: String!
 * }
 */
export const NotFoundError = objectType({
  name: Errors.NOT_FOUND_ERROR,
  definition(t) {
    t.nonNull.string('message', {
      resolve: (data) => Messages.NOT_FOUND_ERROR,
    })
  },
})
/**
 * @name UploadImageError
 * @prop {String} message - Error messsage
 * @description An object type.
 * @example
 * type UploadImageError {
 *  message: String!
 * }
 */
export const UploadImageError = objectType({
  name: Errors.UPLOAD_IMAGE_ERROR,
  definition(t) {
    t.nonNull.string('message', {
      resolve: (data) => Messages.UPLOAD_IMAGE_ERROR,
    })
  },
})
/**
 * @name PasswordMatchedError
 * @prop {String} message - Error messsage
 * @description An object type.
 * @example
 * type PasswordMatchedError {
 *  message: String!
 * }
 */
export const PasswordMatchedError = objectType({
  name: Errors.PASSWORD_MATCHED_ERROR,
  definition(t) {
    t.nonNull.string('message', {
      resolve: (data) => Messages.PASSWORD_MATCHED_ERROR,
    })
  },
})
/**
 * @name MaximumIdeasExceededError
 * @prop {String} message - Error messsage
 * @description An object type.
 * @example
 * type MaximumIdeasExceededError {
 *  message: String!
 * }
 */
 export const MaximumIdeasExceededError = objectType({
  name: Errors.MAXIMUM_IDEAS_EXCEEDED_ERROR,
  definition(t) {
    t.nonNull.string('message', {
      resolve: (data) => Messages.MAXIMUM_IDEAS_EXCEEDED_ERROR,
    })
  },
})
