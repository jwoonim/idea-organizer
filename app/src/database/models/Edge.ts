import { getModelForClass, prop, Ref } from '@typegoose/typegoose'

import modelOptions from './model-options'
import { Graph } from './Graph'

export class Edge {
  @prop({ required: true, ref: () => Graph })
  public graphId!: Ref<Graph>

  @prop({ required: true, trim: true })
  public id!: string

  @prop({ required: false, default: 'default' })
  public type?: string

  @prop({ required: true })
  public source!: string

  @prop({ required: true })
  public target!: string
}

export const EdgeModel = getModelForClass(Edge, modelOptions)
