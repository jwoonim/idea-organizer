import { extendType, inputObjectType, objectType, unionType } from 'nexus'
import { compare } from 'bcrypt'

import { findUserByEmail } from 'src/database/services'
import {
  ErrorResults,
  Errors,
  Messages,
  SignUpMethods,
} from 'src/utils/constants'
import { createSessionId } from 'src/utils/uuid'
import { storeSessionId } from 'src/redis/services/session'
import { setCookie, createSessionIdCookie } from 'src/utils/cookies'

/**
 * @name SignInInput
 * @prop {String} email    - User email
 * @prop {String} password - User password
 * @example
 * @description An input type.
 * {
 *    "SignInInput": {
 *      "email": "USER_EMAIL",
 *      "password": "USER_PASSWORD"
 *    }
 * }
 */
export const SignInInput = inputObjectType({
  name: 'SignInInput',
  definition: (t) => {
    t.nonNull.string('email')
    t.nonNull.string('password')
  },
})
/**
 * @name SignInResult
 * @member SignInSuccess
 * @member InvalidInputError
 * @member SignUpMethodError
 * @member IncorrectCredentialsError
 * @description A union type.
 * @example
 * union SignInResult =
 *  SignInSuccess
 *  | InvalidInputError
 *  | SignUpMethodError
 *  | IncorrectCredentialsError
 */
export const SignInResult = unionType({
  name: 'SignInResult',
  definition: (t) => {
    t.members(
      'SignInSuccess',
      Errors.INVALID_INPUT_ERROR,
      Errors.SIGN_UP_METHOD_ERROR,
      Errors.INCORRECT_CREDENCIALS_ERROR
    )
  },
  resolveType: (item) => Object.keys(item)[0],
})
/**
 * @name SignInSuccess
 * @prop success
 * @description An object type.
 * @example
 * type SignInSuccess {
 *  success: Boolean!
 * }
 */
export const SignInSuccess = objectType({
  name: 'SignInSuccess',
  definition: (t) => {
    t.nonNull.boolean('success', {
      resolve: (data) => true,
    })
  },
})
/**
 * @name SignIn
 * @description A mutation type.
 * Validate user credentials and return session ID.
 */
export const SignIn = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.nonNull.field('signIn', {
      type: 'SignInResult',
      args: { input: SignInInput },
      resolve: async (_root, args, ctx) => {
        const { email, password } = args.input
        if (!email || !password) return ErrorResults.INVALID_INPUT_ERROR

        const User: any = await findUserByEmail(email)
        if (!User) return ErrorResults.INCORRECT_CREDENCIALS_ERROR

        if (User.signUpMethod === SignUpMethods.GOOGLE)
          return ErrorResults.SIGN_UP_METHOD_ERROR(
            Messages.EMAIL_SIGN_UP_METHOD_ERROR
          )

        if (!(await compare(password, User.password)))
          return ErrorResults.INCORRECT_CREDENCIALS_ERROR

        const { _id } = User
        const sessionId = createSessionId()
        storeSessionId(sessionId, { _id })
        const sessionIdCookie = createSessionIdCookie(sessionId)
        setCookie([sessionIdCookie], ctx.res)

        return { SignInSuccess: {} }
      },
    })
  },
})
