import { getModelForClass, prop } from '@typegoose/typegoose'

import { SignUpMethods } from 'src/utils/constants'
import modelOptions from './model-options'

export class User {
  @prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  public email!: string

  @prop({ required: true, trim: true })
  public name!: string

  @prop({ required: true })
  public password!: string

  @prop({ required: false, trim: true, default: '' })
  public picture?: string

  @prop({
    required: true,
    enum: [SignUpMethods.EMAIL, SignUpMethods.GOOGLE],
    default: SignUpMethods.EMAIL,
  })
  public signUpMethod!: string
}

export const UserModel = getModelForClass(User, modelOptions)
