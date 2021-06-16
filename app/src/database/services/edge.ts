import { DocumentType } from '@typegoose/typegoose'

import { EdgeModel } from '../models'

export const findEdgesyGraphId = async (
  graphId: string
): Promise<DocumentType<any>> => {
  return await EdgeModel.find({ graphId })
}

export const createEdges = async (edges: []): Promise<any> => {
  return await EdgeModel.insertMany(edges)
}

export const deleteEdgesByGraphId = async (graphId: string): Promise<any> => {
  return await EdgeModel.deleteMany({ graphId })
}

export const deleteEdgesByGraphIds = async (
  graphId: string[]
): Promise<any> => {
  return await EdgeModel.deleteMany({ graphId: { $in: graphId } })
}
