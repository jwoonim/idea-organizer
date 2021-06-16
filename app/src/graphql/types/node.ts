import { objectType } from 'nexus'

/**
 * @name Data
 * @prop {String} label  - Data label
 * @prop {String} color  - Data color
 * @description An object type.
 * @example
 * type Data {
 *  label: String!
 *  color: String!
 * }
 */
export const Data = objectType({
  name: 'Data',
  definition: (t) => {
    t.nonNull.string('label')
    t.nonNull.string('color')
  },
})
/**
 * @name Position
 * @prop {Float} x  - Position x
 * @prop {Float} y  - Position y
 * @description An object type.
 * @example
 * type Position {
 *  label: Float!
 *  color: Float!
 * }
 */
export const Position = objectType({
  name: 'Position',
  definition: (t) => {
    t.nonNull.float('x')
    t.nonNull.float('y')
  },
})
/**
 * @name Node
 * @prop {String} _id        - Node ID
 * @prop {String} graphId    - Node graphId
 * @prop {String} id         - Node id
 * @prop {String} type       - Node type
 * @prop {Data} data         - Node data
 * @prop {Position} position - Node position
 * @description An object type.
 * @example
 * type Node {
 *  _id: String!
 *  graphId: String!
 *  id: String!
 *  type: String!
 *  data: Data!
 *  position: Position!
 * }
 */
export const Node = objectType({
  name: 'Node',
  definition: (t) => {
    t.nonNull.string('_id')
    t.nonNull.string('graphId')
    t.nonNull.string('id')
    t.nonNull.string('type')
    t.nonNull.field('data', {
      type: 'Data',
      resolve: (t) => t.data,
    })
    t.nonNull.field('position', {
      type: 'Position',
      resolve: (t) => t.position,
    })
  },
})
