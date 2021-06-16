import { objectType } from 'nexus'

/**
 * @name User
 * @prop {String} _id            - User ID
 * @prop {String} email          - User email
 * @prop {String} name           - User name
 * @prop {String} picture        - User picture
 * @prop {String} signUpMethod   - User signUpMethod
 * @prop {String} ideaCount      - User ideaCount
 * @description An object type.
 * @example
 * type User {
 *  _id: String!
 *  email: String!
 *  name: String!
 *  picture: String!
 *  signUpMethod: String
 *  ideaCount: Int
 * }
 */
export const User = objectType({
  name: 'User',
  definition: (t) => {
    t.nonNull.string('_id')
    t.nonNull.string('email')
    t.nonNull.string('name')
    t.nonNull.string('picture')
    t.string('signUpMethod')
    t.int('ideaCount')
  },
})
