import { DocumentType } from '@typegoose/typegoose'

import { NodeModel } from '../models'

export const findNodesyGraphId = async (
  graphId: string
): Promise<DocumentType<any>> => {
  return await NodeModel.find({ graphId })
}

export const createNodes = async (nodes: []): Promise<any> => {
  return await NodeModel.insertMany(nodes)
}

export const deleteNodesByGraphId = async (graphId: string): Promise<any> => {
  return await NodeModel.deleteMany({ graphId })
}

export const deleteNodesByGraphIds = async (
  graphId: string[]
): Promise<any> => {
  return await NodeModel.deleteMany({ graphId: { $in: graphId } })
}
