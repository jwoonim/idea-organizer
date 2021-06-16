import { objectType } from 'nexus'

/**
 * @name Graph
 * @prop {String} _id      - Graph ID
 * @prop {String} userId   - Graph userId
 * @prop {String} picture  - Graph picture
 * @description An object type.
 * @example
 * type Graph {
 *  _id: String!
 *  userId: String!
 *  picture: String!
 * }
 */
export const Graph = objectType({
  name: 'Graph',
  definition: (t) => {
    t.nonNull.string('_id')
    t.nonNull.string('userId')
    t.nonNull.string('picture')
  },
})
