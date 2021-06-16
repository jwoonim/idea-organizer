import { extendType, objectType, unionType } from 'nexus'

import {
  deleteGraphByUserId,
  deleteUser,
  findGraphdIdsByUserId,
  deleteNodesByGraphIds,
  deleteEdgesByGraphIds,
} from 'src/database/services'
import { removeSessionId } from 'src/redis/services'
import { ErrorResults, Errors } from 'src/utils/constants'
import { removeCookie } from 'src/utils/cookies'
import { removeImages } from 'src/utils/google-cloud-storage'
import { checkSessionId } from '../middlewares'

/**
 * @name DeleteUserResult
 * @member DeleteUserSuccess
 * @member InvalidSessionError
 * @description A union type.
 * @example
 * union DeleteUserResult =
 *  DeleteUserSuccess
 *  | InvalidSessionError
 */
export const DeleteUserResult = unionType({
  name: 'DeleteUserResult',
  definition: (t) => {
    t.members('DeleteUserSuccess', Errors.INVALID_SESSION_ERROR)
  },
  resolveType: (item) => Object.keys(item)[0],
})
/**
 * @name DeleteUserSuccess
 * @prop success
 * @description An object type.
 * @example
 * type SignInSuccess {
 *  success: Boolean!
 * }
 */
export const DeleteUserSuccess = objectType({
  name: 'DeleteUserSuccess',
  definition: (t) => {
    t.nonNull.boolean('success', {
      resolve: (data) => true,
    })
  },
})
/**
 * @name DeleteUser
 * @description A mutation type.
 * Delete a user account.
 */
export const DeleteUser = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteUser', {
      type: 'DeleteUserResult',
      resolve: async (_root, args, ctx) => {
        const { _id } = await checkSessionId(ctx.req)
        if (!_id) return ErrorResults.INVALID_SESSION_ERROR

        await deleteUser(_id)
        const graphs: string[] = (await findGraphdIdsByUserId(_id)) ?? []
        if (graphs.length > 0) {
          await deleteGraphByUserId(_id)
          await deleteNodesByGraphIds(graphs)
          await deleteEdgesByGraphIds(graphs)
          await removeImages(_id)
        }
        removeSessionId(ctx.req.cookies.SSID)
        removeCookie(['SSID'], ctx.res)

        return { DeleteUserSuccess: {} }
      },
    })
  },
})
