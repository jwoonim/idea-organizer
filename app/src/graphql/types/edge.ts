import { objectType } from 'nexus'

/**
 * @name Edge
 * @prop {String} _id      - Edge ID
 * @prop {String} graphId  - Edge email
 * @prop {String} id       - Edge name
 * @prop {String} type     - Edge picture
 * @prop {String} source   - Edge picture
 * @prop {String} target   - Edge picture
 * @description An object type.
 * @example
 * type Edge {
 *  _id: String!
 *  graphId: String!
 *  id: String!
 *  type: String!
 *  source: String!
 *  target: String!
 * }
 */
export const Edge = objectType({
  name: 'Edge',
  definition: (t) => {
    t.nonNull.string('_id')
    t.nonNull.string('graphId')
    t.nonNull.string('id')
    t.nonNull.string('type')
    t.nonNull.string('source')
    t.nonNull.string('target')
  },
})
