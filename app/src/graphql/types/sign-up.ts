import {
  extendType,
  inputObjectType,
  nonNull,
  objectType,
  stringArg,
  unionType,
} from 'nexus'

import { createUser, findUserByEmail } from 'src/database/services'
import { sendEmail } from 'src/utils/email'
import {
  Secrets,
  Errors,
  ErrorResults,
  EmailTypes,
  SignUpMethods,
} from 'src/utils/constants'
import { createLinkId } from 'src/utils/uuid'
import { storeLinkId, getLinkId, removeLinkId } from 'src/redis/services'
import { hash } from 'bcrypt'

/**
 * @name SignUpInput
 * @prop {email} email       - User email
 * @prop {name} name         - User name
 * @prop {password} password - User password
 * @example
 * @description An input type.
 * {
 *    "SignUpInput": {
 *      "email": "USER_EMAIL",
 *      "name": "USER_NAME",
 *      "password": "USER_PASSWORD"
 *    }
 * }
 */
export const SignUpInput = inputObjectType({
  name: 'SignUpInput',
  definition: (t) => {
    t.nonNull.string('email')
    t.nonNull.string('name')
    t.nonNull.string('password')
  },
})
/**
 * @name SignUpResult
 * @member SignUpSuccess
 * @member InvalidInputError
 * @member EmailConflictError
 * @member SendMailError
 * @description A union type.
 * @example
 * union SignUpResult =
 *  SignUpSuccess
 *  | InvalidInputError
 *  | EmailConflictError
 *  | SendMailError
 */
export const SignUpResult = unionType({
  name: 'SignUpResult',
  definition: (t) => {
    t.members(
      'SignUpSuccess',
      Errors.INVALID_INPUT_ERROR,
      Errors.EMAIL_CONFLICT_ERROR,
      Errors.SEND_MAIL_ERROR
    )
  },
  resolveType: (item) => Object.keys(item)[0],
})
/**
 * @name VerifyEmailResult
 * @member VerifyEmailSuccess
 * @member InvalidInputError
 * @member EmailConflictError
 * @member InvalidLinkError
 * @description A union type.
 * @example
 * union VerifyEmailResult =
 *  VerifyEmailSuccess
 *  | InvalidInputError
 *  | EmailConflictError
 *  | InvalidLinkError
 */
export const VerifyEmailResult = unionType({
  name: 'VerifyEmailResult',
  definition: (t) => {
    t.members(
      'VerifyEmailSuccess',
      Errors.INVALID_INPUT_ERROR,
      Errors.EMAIL_CONFLICT_ERROR,
      Errors.INVALID_LINK_ERROR
    )
  },
  resolveType: (item) => Object.keys(item)[0],
})
/**
 * @name SignUpSuccess
 * @prop success
 * @description An object type.
 * @example
 * type SignUpSuccess {
 *  success: Boolean!
 * }
 */
export const SignUpSuccess = objectType({
  name: 'SignUpSuccess',
  definition: (t) => {
    t.nonNull.boolean('success', {
      resolve: (data) => true,
    })
  },
})
/**
 * @name VerifyEmailSuccess
 * @prop success
 * @description An object type.
 * @example
 * type VerifyEmailSuccess {
 *  success: Boolean!
 * }
 */
export const VerifyEmailSuccess = objectType({
  name: 'VerifyEmailSuccess',
  definition: (t) => {
    t.nonNull.boolean('success', {
      resolve: (data) => true,
    })
  },
})
/**
 * @name SignUp
 * @description A mutation type.
 * Send a registration link.
 */
export const SignUp = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.nonNull.field('signUp', {
      type: 'SignUpResult',
      args: { input: SignUpInput },
      resolve: async (_root, args, ctx) => {
        const { email, name, password } = args.input
        if (!email || !name || !password)
          return ErrorResults.INVALID_INPUT_ERROR

        if (await findUserByEmail(email))
          return ErrorResults.EMAIL_CONFLICT_ERROR

        const linkId = createLinkId()
        const hashedPassword = await hash(password, 10)
        storeLinkId(linkId, { email, name, hashedPassword })

        try {
          await sendEmail(
            email,
            Secrets.EMAIL_VERIFICATION_URL + linkId,
            name,
            EmailTypes.VERIFY_EMAIL
          )
          return { SignUpSuccess: {} }
        } catch (error) {
          console.log('Nodemailer', error)
          return ErrorResults.SEND_MAIL_ERROR
        }
      },
    })
  },
})
/**
 * @name VerifyEmail
 * @description A mutation type.
 * Verify a registration link and create a new user.
 */
export const VerifyEmail = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.nonNull.field('verifyEmail', {
      type: 'VerifyEmailResult',
      args: { id: nonNull(stringArg()) },
      resolve: async (_root, args, ctx) => {
        const { id } = args
        if (!id) return ErrorResults.INVALID_INPUT_ERROR

        const user: any = await getLinkId(id)
        if (!user) return ErrorResults.INVALID_LINK_ERROR

        if (await findUserByEmail(user.email))
          return ErrorResults.EMAIL_CONFLICT_ERROR

        user.signUpMethod = SignUpMethods.EMAIL
        await createUser(user)

        removeLinkId(id)

        return { VerifyEmailSuccess: {} }
      },
    })
  },
})
