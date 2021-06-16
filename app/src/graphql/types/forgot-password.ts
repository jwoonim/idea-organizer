import {
  extendType,
  inputObjectType,
  nonNull,
  objectType,
  stringArg,
  unionType,
} from 'nexus'

import { updatePassword, findUserByEmail } from 'src/database/services'
import { getLinkId, removeLinkId, storeLinkId } from 'src/redis/services'
import { ErrorResults, Errors, Secrets, EmailTypes } from 'src/utils/constants'
import { sendEmail } from 'src/utils/email'
import { createLinkId } from 'src/utils/uuid'

/**
 * @name ResetPasswordInput
 * @prop {String} password - User password
 * @prop {String} id       - Link ID
 * @example
 * @description An input type.
 * {
 *    "input": {
 *      "password": "USER_PASSWORD",
 *      "id": "LINK_ID"
 *    }
 * }
 */
export const resetPasswordInput = inputObjectType({
  name: 'ResetPasswordInput',
  definition: (t) => {
    t.nonNull.string('password')
    t.nonNull.string('id')
  },
})
/**
 * @name FindPasswordResult
 * @member FindPasswordSuccess
 * @member InvalidInputError
 * @member UserNotFoundError
 * @member SendMailError
 * @description A union type.
 * @example
 * union FindPasswordResult =
 *  FindPasswordSuccess
 *  | InvalidInputError
 *  | UserNotFoundError
 *  | SendMailError
 */
export const FindPasswordResult = unionType({
  name: 'FindPasswordResult',
  definition: (t) => {
    t.members(
      'FindPasswordSuccess',
      Errors.INVALID_INPUT_ERROR,
      Errors.USER_NOT_FOUND_ERROR,
      Errors.SEND_MAIL_ERROR
    )
  },
  resolveType: (item) => Object.keys(item)[0],
})
/**
 * @name FindPasswordSuccess
 * @prop success
 * @description An object type.
 * @example
 * type FindPasswordSuccess {
 *  success: Boolean!
 * }
 */
export const FindPasswordSuccess = objectType({
  name: 'FindPasswordSuccess',
  definition: (t) => {
    t.nonNull.boolean('success', {
      resolve: (data) => true,
    })
  },
})
/**
 * @name ValidatePasswordResetLinkResult
 * @member ValidatePasswordResetLinkSuccess
 * @member InvalidInputError
 * @member InvalidLinkError
 * @description A union type.
 * @example
 * union ValidatePasswordResetLinkResult =
 *  ValidatePasswordResetLinkSuccess
 *  | InvalidInputError
 *  | InvalidLinkError
 */
export const ValidatePasswordResetLinkResult = unionType({
  name: 'ValidatePasswordResetLinkResult',
  definition: (t) => {
    t.members(
      'ValidatePasswordResetLinkSuccess',
      Errors.INVALID_INPUT_ERROR,
      Errors.INVALID_LINK_ERROR
    )
  },
  resolveType: (item) => Object.keys(item)[0],
})
/**
 * @name ValidatePasswordResetLinkSuccess
 * @prop success
 * @description An object type.
 * @example
 * type ValidatePasswordResetLinkSuccess {
 *  success: Boolean!
 * }
 */
export const ValidatePasswordResetLinkSuccess = objectType({
  name: 'ValidatePasswordResetLinkSuccess',
  definition: (t) => {
    t.nonNull.boolean('success', {
      resolve: (data) => true,
    })
  },
})
/**
 * @name ResetPasswordResult
 * @member ResetPasswordSuccess
 * @member InvalidInputError
 * @member InvalidLinkError
 * @description A union type.
 * @example
 * union ResetPasswordResult =
 *  ResetPasswordSuccess
 *  | InvalidInputError
 *  | InvalidLinkError
 */
export const ResetPasswordResult = unionType({
  name: 'ResetPasswordResult',
  definition: (t) => {
    t.members(
      'ResetPasswordSuccess',
      Errors.INVALID_INPUT_ERROR,
      Errors.INVALID_LINK_ERROR
    )
  },
  resolveType: (item) => Object.keys(item)[0],
})
/**
 * @name ResetPasswordSuccess
 * @prop success
 * @description An object type.
 * @example
 * type ResetPasswordSuccess {
 *  success: Boolean!
 * }
 */
export const ResetPasswordSuccess = objectType({
  name: 'ResetPasswordSuccess',
  definition: (t) => {
    t.nonNull.boolean('success', {
      resolve: (data) => true,
    })
  },
})
/**
 * @name FindPassword
 * @description A mutation type.
 * Send a link to reset password.
 */
export const FindPassword = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('findPassword', {
      args: { email: nonNull(stringArg()) },
      type: 'FindPasswordResult',
      resolve: async (_root, args, ctx) => {
        const { email } = args
        if (!email) return ErrorResults.INVALID_INPUT_ERROR

        const user = await findUserByEmail(email)
        if (!user) return ErrorResults.USER_NOT_FOUND_ERROR

        const { _id } = user
        const linkId = createLinkId()
        storeLinkId(linkId, { _id })

        try {
          await sendEmail(
            email,
            Secrets.RESET_PASSWORD_URL + linkId,
            user.name,
            EmailTypes.RESET_PASSWORD
          )
          return { FindPasswordSuccess: {} }
        } catch (error) {
          console.log('Nodemailer', error)
          return ErrorResults.SEND_MAIL_ERROR
        }
      },
    })
  },
})
/**
 * @name ValidatePasswordResetLink
 * @description A query type.
 * Validate a link ID.
 */
export const ValidatePasswordResetLink = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('validatePasswordResetLink', {
      args: { id: nonNull(stringArg()) },
      type: 'ValidatePasswordResetLinkResult',
      resolve: async (_root, args, ctx) => {
        const { id } = args
        if (!id) return ErrorResults.INVALID_INPUT_ERROR

        const { _id } = await getLinkId(id)
        if (!_id) return ErrorResults.INVALID_LINK_ERROR

        return { ValidatePasswordResetLinkSuccess: {} }
      },
    })
  },
})
/**
 * @name ResetPassword
 * @description A mutation type.
 * Reset password.
 */
export const ResetPassword = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('resetPassword', {
      args: { input: resetPasswordInput },
      type: 'ResetPasswordResult',
      resolve: async (_root, args, ctx) => {
        const { password, id } = args.input
        if (!password || !id) return ErrorResults.INVALID_INPUT_ERROR

        const { _id } = await getLinkId(id)
        if (!_id) return ErrorResults.INVALID_LINK_ERROR

        await updatePassword(_id, password)
        removeLinkId(id)

        return { ResetPasswordSuccess: {} }
      },
    })
  },
})
