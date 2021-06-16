import { compare } from 'bcrypt'
import { extendType, nonNull, objectType, stringArg, unionType } from 'nexus'
import { findUserById, updatePassword } from 'src/database/services'

import { ErrorResults, Errors } from 'src/utils/constants'
import { checkSessionId } from '../middlewares'

/**
 * @name CheckPasswordResult
 * @member CheckPasswordSuccess
 * @member InvalidInputError
 * @member InvalidSessionError
 * @member IncorrectCredentialsError
 * @description A union type.
 * @example
 * union CheckPasswordResult =
 *  CheckPasswordSuccess
 *  | InvalidInputError
 *  | InvalidSessionError
 *  | IncorrectCredentialsError
 */
export const CheckPasswordResult = unionType({
  name: 'CheckPasswordResult',
  definition: (t) => {
    t.members(
      'CheckPasswordSuccess',
      Errors.INVALID_INPUT_ERROR,
      Errors.INVALID_SESSION_ERROR,
      Errors.INCORRECT_CREDENCIALS_ERROR
    )
  },
  resolveType: (item) => Object.keys(item)[0],
})
/**
 * @name UpdatePasswordResult
 * @member UpdatePasswordSuccess
 * @member InvalidInputError
 * @member InvalidSessionError
 * @member PasswordMatchedError
 * @description A union type.
 * @example
 * union UpdatePasswordResult =
 *  UpdatePasswordSuccess
 *  | InvalidInputError
 *  | InvalidSessionError
 *  | PasswordMatchedError
 */
export const UpdatePasswordResult = unionType({
  name: 'UpdatePasswordResult',
  definition: (t) => {
    t.members(
      'UpdatePasswordSuccess',
      Errors.INVALID_INPUT_ERROR,
      Errors.INVALID_SESSION_ERROR,
      Errors.PASSWORD_MATCHED_ERROR
    )
  },
  resolveType: (item) => Object.keys(item)[0],
})
/**
 * @name CheckPasswordSuccess
 * @prop success
 * @description An object type.
 * @example
 * type CheckPasswordSuccess {
 *  success: Boolean!
 * }
 */
export const CheckPasswordSuccess = objectType({
  name: 'CheckPasswordSuccess',
  definition: (t) => {
    t.nonNull.boolean('success', {
      resolve: (data) => true,
    })
  },
})
/**
 * @name UpdatePasswordSuccess
 * @prop success
 * @description An object type.
 * @example
 * type UpdatePasswordSuccess {
 *  success: Boolean!
 * }
 */
export const UpdatePasswordSuccess = objectType({
  name: 'UpdatePasswordSuccess',
  definition: (t) => {
    t.nonNull.boolean('success', {
      resolve: (data) => true,
    })
  },
})
/**
 * @name CheckPassword
 * @description A mutation type.
 * Check if a password is correct.
 */
export const CheckPassword = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.nonNull.field('checkPassword', {
      type: 'CheckPasswordResult',
      args: { password: nonNull(stringArg()) },
      resolve: async (_root, args, ctx) => {
        const { password } = args
        if (!password) return ErrorResults.INVALID_INPUT_ERROR

        const { _id } = await checkSessionId(ctx.req)
        if (!_id) return ErrorResults.INVALID_SESSION_ERROR

        const user = await findUserById(_id)

        if (!(await compare(password, user.password)))
          return ErrorResults.INCORRECT_CREDENCIALS_ERROR

        return { CheckPasswordSuccess: {} }
      },
    })
  },
})
/**
 * @name UpdatePassword
 * @description A mutation type.
 * Update user password.
 */
export const UpdatePassword = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updatePassword', {
      args: { password: nonNull(stringArg()) },
      type: 'UpdatePasswordResult',
      resolve: async (_root, args, ctx) => {
        const { password } = args
        if (!password) return ErrorResults.INVALID_INPUT_ERROR

        const { _id } = await checkSessionId(ctx.req)
        if (!_id) return ErrorResults.INVALID_SESSION_ERROR

        const user = await findUserById(_id)
        if (await compare(password, user.password))
          return ErrorResults.PASSWORD_MATCHED_ERROR

        await updatePassword(_id, password)

        return { UpdatePasswordSuccess: {} }
      },
    })
  },
})
