import { DocumentType } from '@typegoose/typegoose'
import { hash } from 'bcrypt'

import { UserModel } from '../models'

export const findUserById = async (_id: string): Promise<DocumentType<any>> => {
  return await UserModel.findOne({ _id })
}

export const findUserByEmail = async (
  email: string
): Promise<DocumentType<any>> => {
  email = email.toLocaleLowerCase()
  return await UserModel.findOne({ email })
}

export const createUser = async (user: any): Promise<any> => {
  if (user?.hashedPassword) user.password = user.hashedPassword
  return await UserModel.create(user)
}

export const updatePassword = async (_id: string, password: string) => {
  password = await hash(password, 10)
  return await UserModel.updateOne({ _id }, { $set: { password } })
}

export const deleteUser = async (_id: string) => {
  return await UserModel.deleteOne({ _id })
}
