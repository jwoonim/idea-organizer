import { DocumentType } from '@typegoose/typegoose'

import { GraphModel } from '../models'

export const findGraphById = async (
  _id: string
): Promise<DocumentType<any>> => {
  return await GraphModel.findOne({ _id })
}

export const findGraphsByUserId = async (
  userId: string
): Promise<any | [DocumentType<any>]> => {
  return await GraphModel.find({ userId }).sort({ updatedAt: -1 })
}

export const findGraphdIdsByUserId = async (userId: string) => {
  return await GraphModel.distinct('_id', { userId })
}

export const createGraph = async (graph: any): Promise<any> => {
  return await GraphModel.create(graph)
}

export const uploadPicture = async (_id: string, picture: string) => {
  return await GraphModel.updateOne({ _id }, { $set: { picture } })
}

export const deleteGraphById = async (_id: string) => {
  return await GraphModel.deleteOne({ _id })
}

export const deleteGraphByUserId = async (userId: string) => {
  return await GraphModel.deleteMany({ userId })
}

export const getIdeaCount = async (userId: string): Promise<number> => {
  return (await GraphModel.countDocuments({ userId }))
}
