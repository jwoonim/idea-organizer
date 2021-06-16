import { getModelForClass, prop, Ref } from '@typegoose/typegoose'

import modelOptions from './model-options'
import { Graph } from './Graph'

class Data {
  @prop({ required: false, default: '' })
  public label?: string

  @prop({ required: true, default: 'gray' })
  public color!: string
}

class Position {
  @prop({ required: true })
  public x!: number

  @prop({ required: true })
  public y!: number
}

export class Node {
  @prop({ required: true, ref: () => Graph })
  public graphId!: Ref<Graph>

  @prop({ required: true, trim: true })
  public id!: string

  @prop({ required: false, default: 'customNode' })
  public type?: string

  @prop()
  public data!: Data

  @prop()
  public position!: Position
}

export const NodeModel = getModelForClass(Node, modelOptions)
