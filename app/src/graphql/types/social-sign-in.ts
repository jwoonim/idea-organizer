import { extendType, nonNull, objectType, stringArg, unionType } from 'nexus'
import { google } from 'googleapis'
import { hash } from 'bcrypt'

import {
  ErrorResults,
  Errors,
  Messages,
  Secrets,
  SignUpMethods,
} from 'src/utils/constants'
import { createUser, findUserByEmail } from 'src/database/services'
import { createSessionId } from 'src/utils/uuid'
import { storeSessionId } from 'src/redis/services'
import { createSessionIdCookie, setCookie } from 'src/utils/cookies'

const { OAuth2 } = google.auth
const googleClient = new OAuth2(Secrets.GOOGLE_CLIENT_ID)

/**
 * @name SocialSignInSuccess
 * @prop success
 * @description An object type.
 * @example
 * type SocialSignInSuccess {
 *  success: Boolean!
 * }
 */
export const SocialSignInSuccess = objectType({
  name: 'SocialSignInSuccess',
  definition: (t) => {
    t.nonNull.boolean('success', {
      resolve: (data) => true,
    })
  },
})
/**
 * @name SocialSignInResult
 * @member SocialSignInSuccess
 * @member InvalidInputError
 * @member SignUpMethodError
 * @member EmailVerificationError
 * @description A union type.
 * @example
 * union SocialSignInResult =
 *  SocialSignInSuccess
 *  | InvalidInputError
 *  | InvalidTokenError
 *  | SignUpMethodError
 *  | EmailVerificationError
 */
export const SocialSignInResult = unionType({
  name: 'SocialSignInResult',
  definition: (t) => {
    t.members(
      'SocialSignInSuccess',
      Errors.INVALID_INPUT_ERROR,
      Errors.INVALID_TOKEN_ERROR,
      Errors.SIGN_UP_METHOD_ERROR,
      Errors.EMAIL_VERIFICATION_ERROR
    )
  },
  resolveType: (item) => Object.keys(item)[0],
})
/**
 * @name SocialSignIn
 * @description A mutation type.
 * Sign-on function using existing information from a social networking service.
 */
export const SocialSignIn = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('socialSignIn', {
      args: { token: nonNull(stringArg()) },
      type: 'SocialSignInResult',
      resolve: async (_root, args, ctx) => {
        const { token } = args
        if (!token) return ErrorResults.INVALID_INPUT_ERROR

        const res = await googleClient.verifyIdToken({
          idToken: token,
          audience: Secrets.GOOGLE_CLIENT_ID,
        })
        const { email, name, picture, email_verified } = res.getPayload()

        if (!email_verified) return ErrorResults.EMAIL_VERIFICATION_ERROR

        const User: any = await findUserByEmail(email)
        let _id: any

        if (User) {
          if (User.signUpMethod === SignUpMethods.EMAIL)
            return ErrorResults.SIGN_UP_METHOD_ERROR(
              Messages.GOOGLE_SIGN_UP_METHOD_ERROR
            )

          _id = User._id
        } else {
          const password = await hash(
            email + Secrets.SOCIAL_SIGN_UP_PASSWORD_KEY,
            10
          )
          const signUpMethod = SignUpMethods.GOOGLE
          const user = await createUser({
            email,
            name,
            password,
            picture,
            signUpMethod,
          })
          _id = user._id
        }
        const sessionId = createSessionId()
        storeSessionId(sessionId, { _id })
        const sessionIdCookie = createSessionIdCookie(sessionId)
        setCookie([sessionIdCookie], ctx.res)

        return { SocialSignInSuccess: {} }
      },
    })
  },
})
