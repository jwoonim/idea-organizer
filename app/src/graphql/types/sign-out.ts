import { extendType, objectType, unionType } from 'nexus'

import { getSessionId, removeSessionId } from 'src/redis/services'
import { ErrorResults, Errors } from 'src/utils/constants'
import { removeCookie } from 'src/utils/cookies'

/**
 * @name SignOutResult
 * @member SignOutSuccess
 * @member InvalidSessionError
 * @description A union type.
 * @example
 * union SignOutResult =
 *  SignOutSuccess
 *  | InvalidSessionError
 */
export const SignOutResult = unionType({
  name: 'SignOutResult',
  definition: (t) => {
    t.members('SignOutSuccess', Errors.INVALID_SESSION_ERROR)
  },
  resolveType: (item) => Object.keys(item)[0],
})
/**
 * @name SignOutSuccess
 * @prop success
 * @description An object type.
 * @example
 * type SignOutSuccess {
 *  success: Boolean!
 * }
 */
export const SignOutSuccess = objectType({
  name: 'SignOutSuccess',
  definition: (t) => {
    t.nonNull.boolean('success', {
      resolve: (data) => true,
    })
  },
})
/**
 * @name SignOut
 * @description A mutation type.
 * Remove session ID.
 */
export const SignOut = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.nonNull.field('signOut', {
      type: 'SignOutResult',
      async resolve(_root, args, ctx) {
        const sessionId = ctx.req.cookies.SSID || null
        if (!sessionId) return ErrorResults.INVALID_SESSION_ERROR

        const user = getSessionId(sessionId)
        if (!user) return ErrorResults.INVALID_SESSION_ERROR

        removeSessionId(sessionId)
        removeCookie(['SSID'], ctx.res)

        return { SignOutSuccess: {} }
      },
    })
  },
})
