import { extendType, objectType, unionType } from 'nexus'

import { findUserById, getIdeaCount } from 'src/database/services'
import { ErrorResults, Errors } from 'src/utils/constants'
import { checkSessionId } from '../middlewares'

/**
 * @name MeResult
 * @member MeSuccess
 * @member InvalidSessionError
 * @member UserNotFoundError
 * @description A union type.
 * @example
 * union MeResult =
 *  MeSuccess
 *  | InvalidSessionError
 *  | UserNotFoundError
 */
export const MeResult = unionType({
  name: 'MeResult',
  definition: (t) => {
    t.members(
      'MeSuccess',
      Errors.INVALID_SESSION_ERROR,
      Errors.USER_NOT_FOUND_ERROR
    )
  },
  resolveType: (item) => {
    if ('User' in item) return 'MeSuccess'
    return Object.keys(item)[0]
  },
})
/**
 * @name MeSuccess
 * @prop user
 * @description An object type.
 * @example
 * type MeSuccess {
 *  user: User
 * }
 */
export const MeSuccess = objectType({
  name: 'MeSuccess',
  definition: (t) => {
    t.field('user', {
      type: 'User',
      resolve: (root, args, ctx) => root.User,
    })
  },
})
/**
 * @name Me
 * @description A query type.
 * Validate session ID and return user information associated with session ID.
 */
export const Me = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('me', {
      type: 'MeResult',
      resolve: async (_root, args, ctx) => {
        const _id = await checkSessionId(ctx.req)
        if (!_id) return ErrorResults.INVALID_SESSION_ERROR

        const User = await findUserById(_id)
        User.ideaCount = await getIdeaCount(_id)
        return User ? { User } : ErrorResults.USER_NOT_FOUND_ERROR
      },
    })
  },
})
