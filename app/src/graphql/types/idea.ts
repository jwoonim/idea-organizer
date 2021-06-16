import { objectType } from 'nexus'

/**
 * @name Idea
 * @prop {String} _id         - Idea ID
 * @prop {String} picture     - Idea picture
 * @description An object type.
 * @example
 * type Graph {
 *  _id: String!
 *  picture: String!
 * }
 */
export const Idea = objectType({
  name: 'Idea',
  definition: (t) => {
    t.nonNull.string('_id')
    t.nonNull.string('picture')
  },
})
