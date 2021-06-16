import { getModelForClass, prop, Ref } from '@typegoose/typegoose'

import modelOptions from './model-options'
import { User } from './User'

export class Graph {
  @prop({ required: true, ref: () => User })
  public userId!: Ref<User>

  @prop({ required: false, default: '' })
  public picture?: String
}

export const GraphModel = getModelForClass(Graph, modelOptions)
