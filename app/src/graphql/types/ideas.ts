import {
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
  unionType,
} from 'nexus'
import { mongoose } from '@typegoose/typegoose'

import { ErrorResults, Errors } from 'src/utils/constants'
import { checkSessionId } from '../middlewares'
import {
  findEdgesyGraphId,
  findNodesyGraphId,
  createGraph,
  createNodes,
  createEdges,
  findGraphById,
  deleteNodesByGraphId,
  deleteEdgesByGraphId,
  uploadPicture,
  findGraphsByUserId,
  deleteGraphById,
  getIdeaCount,
} from 'src/database/services'
import { removeImage, uploadImage } from 'src/utils/google-cloud-storage'

/**
 * @name SaveElementsInput
 * @prop {Array} nodes    - Graph nodes
 * @prop {Array} edges    - Graph password
 * @example
 * @description An input type.
 * {
 *    "SaveElementsInput": {
 *      "nodes": [],
 *      "edges": []
 *    }
 * }
 */
export const SaveElementsInput = inputObjectType({
  name: 'SaveElementsInput',
  definition: (t) => {
    t.field('nodes', {
      type: list('NodeInput'),
    })
    t.field('edges', {
      type: list('EdgeInput'),
    })
  },
})
/**
 * @name NodeInput
 * @prop {String} _id         - NodeInput _id
 * @prop {String} graphId     - NodeInput graphId
 * @prop {String} id          - NodeInput id
 * @prop {String} type        - NodeInput type
 * @prop {Data} data          - NodeInput data
 * @prop {Position} position  - NodeInput position
 * @example
 * @description An input type.
 * {
 *    "NodeInput": {
 *      "_id": "",
 *      "graphId": "",
 *      "id": "",
 *      "type": "",
 *      "data": {
 *        "label": "",
 *        "color": ""
 *      },
 *      "position": {
 *        "x": 0,
 *        "y": 0
 *      }
 *    }
 * }
 */
export const NodeInput = inputObjectType({
  name: 'NodeInput',
  definition: (t) => {
    t.string('_id')
    t.string('graphId')
    t.nonNull.string('id')
    t.nonNull.string('type')
    t.nonNull.field('data', {
      type: 'DataInput',
    })
    t.nonNull.field('position', {
      type: 'PositionInput',
    })
  },
})
/**
 * @name DataInput
 * @prop {String} label   - DataInput label
 * @prop {String} color   - NodeInput color
 * @example
 * @description An input type.
 * {
 *    "NodeInput": {
 *      "label": "",
 *      "color": ""
 *    }
 * }
 */
export const DataInput = inputObjectType({
  name: 'DataInput',
  definition: (t) => {
    t.nonNull.string('label')
    t.nonNull.string('color')
  },
})
/**
 * @name PositionInput
 * @prop {Float} x   - DataInput x
 * @prop {Float} y   - NodeInput y
 * @example
 * @description An input type.
 * {
 *    "PositionInput": {
 *      "x": "",
 *      "y": ""
 *    }
 * }
 */
export const PositionInput = inputObjectType({
  name: 'PositionInput',
  definition: (t) => {
    t.nonNull.float('x')
    t.nonNull.float('y')
  },
})
/**
 * @name EdgeInput
 * @prop {String} _id         - EdgeInput _id
 * @prop {String} graphId     - EdgeInput graphId
 * @prop {String} id          - EdgeInput id
 * @prop {String} type        - EdgeInput type
 * @prop {String} source      - EdgeInput data
 * @prop {String} target      - EdgeInput position
 * @example
 * @description An input type.
 * {
 *    "EdgeInput": {
 *      "_id": "",
 *      "graphId": "",
 *      "id": "",
 *      "type": "",
 *      "source": "",
 *      "target": "",
 *    }
 * }
 */
export const EdgeInput = inputObjectType({
  name: 'EdgeInput',
  definition: (t) => {
    t.string('_id')
    t.string('graphId')
    t.nonNull.string('id')
    t.nonNull.string('type')
    t.nonNull.string('source')
    t.string('sourceHandle')
    t.nonNull.string('target')
    t.string('targetHandle')
  },
})
/**
 * @name GetIdeasSuccess
 * @prop success
 * @description An object type.
 * @example
 * type GetIdeasSuccess {
 *  success: Boolean!
 * }
 */
export const GetIdeasSuccess = objectType({
  name: 'GetIdeasSuccess',
  definition: (t) => {
    t.list.field('ideas', {
      type: 'Idea',
      resolve: (t) => t.GetIdeasSuccess?.ideas,
    })
  },
})
/**
 * @name ElementsSuccess
 * @prop nodes
 * @prop edges
 * @prop id
 * @description An object type.
 * @example
 * type ElementsSuccess {
 *  nodes: [Node]
 *  edges: [Edge]
 *  id: String
 * }
 */
export const ElementsSuccess = objectType({
  name: 'ElementsSuccess',
  definition: (t) => {
    t.list.nullable.field('nodes', {
      type: 'Node',
      resolve: (t) => t.ElementsSuccess?.nodes,
    })
    t.list.nullable.field('edges', {
      type: 'Edge',
      resolve: (t) => t.ElementsSuccess?.edges,
    })
    t.nullable.string('id', {
      resolve: (t) => t.ElementsSuccess?.id,
    })
    t.nonNull.boolean('success', {
      resolve: (data) => true,
    })
  },
})
/**
 * @name SaveElementsSuccess
 * @prop success
 * @description An object type.
 * @example
 * type SaveElementsSuccess {
 *  success: Boolean!
 * }
 */
export const SaveElementsSuccess = objectType({
  name: 'SaveElementsSuccess',
  definition: (t) => {
    t.nonNull.boolean('success', {
      resolve: (data) => true,
    })
  },
})
/**
 * @name DeleteIdeaSuccess
 * @prop success
 * @description An object type.
 * @example
 * type DeleteIdeaSuccess {
 *  success: Boolean!
 * }
 */
export const DeleteIdeaSuccess = objectType({
  name: 'DeleteIdeaSuccess',
  definition: (t) => {
    t.nonNull.boolean('success', {
      resolve: (data) => true,
    })
  },
})
/**
 * @name GetIdeasResult
 * @member ElementsSuccess
 * @member InvalidSessionError
 * @description A union type.
 * @example
 * union GetIdeasResult =
 *  ElementsSuccess
 *  | InvalidSessionError
 */
export const GetIdeasResult = unionType({
  name: 'GetIdeasResult',
  definition: (t) => {
    t.members('GetIdeasSuccess', Errors.INVALID_SESSION_ERROR)
  },
  resolveType: (item) => Object.keys(item)[0],
})
/**
 * @name ElementsResult
 * @member ElementsSuccess
 * @member InvalidSessionError
 * @member NotFoundError
 * @member MaximumIdeasExceededError
 * @description A union type.
 * @example
 * union ElementsResult =
 *  ElementsSuccess
 *  | InvalidSessionError
 *  | NotFoundError
 *  | MaximumIdeasExceededError
 */
export const ElementsResult = unionType({
  name: 'ElementsResult',
  definition: (t) => {
    t.members(
      'ElementsSuccess',
      Errors.INVALID_SESSION_ERROR,
      Errors.NOT_FOUND_ERROR,
      Errors.MAXIMUM_IDEAS_EXCEEDED_ERROR
    )
  },
  resolveType: (item) => Object.keys(item)[0],
})
/**
 * @name SaveElementsResult
 * @member SaveElementsSuccess
 * @member InvalidSessionError
 * @member UploadImageError
 * @description A union type.
 * @example
 * union SaveElementsResult =
 *  SaveElementsSuccess
 *  | InvalidSessionError
 *  | UploadImageError
 */
export const SaveElementsResult = unionType({
  name: 'SaveElementsResult',
  definition: (t) => {
    t.members(
      'SaveElementsSuccess',
      Errors.INVALID_SESSION_ERROR,
      Errors.UPLOAD_IMAGE_ERROR
    )
  },
  resolveType: (item) => Object.keys(item)[0],
})
/**
 * @name DeleteIdeaResult
 * @member DeleteIdeaSuccess
 * @member InvalidSessionError
 * @member NotFoundError
 * @description A union type.
 * @example
 * union DeleteIdeaResult =
 *  DeleteIdeaSuccess
 *  | InvalidSessionError
 *  | NotFoundError
 */
export const DeleteIdeaResult = unionType({
  name: 'DeleteIdeaResult',
  definition: (t) => {
    t.members(
      'DeleteIdeaSuccess',
      Errors.INVALID_SESSION_ERROR,
      Errors.NOT_FOUND_ERROR
    )
  },
  resolveType: (item) => Object.keys(item)[0],
})
/**
 * @name GetIdea
 * @description A query type.
 * Get an idea.
 */
export const GetIdeas = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getIdeas', {
      type: 'GetIdeasResult',
      resolve: async (_root, args, ctx) => {
        const { _id } = await checkSessionId(ctx.req)
        if (!_id) return ErrorResults.INVALID_SESSION_ERROR

        const ideas = await findGraphsByUserId(_id)
        return { GetIdeasSuccess: { ideas } }
      },
    })
  },
})
/**
 * @name Elements
 * @description A query type.
 * If a graph ID is provided then return all of nodes and edges
 * otherwise create a new graph if a user doesn't have more than 10 graphs.
 */
export const Elements = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('elements', {
      args: { id: stringArg() },
      type: 'ElementsResult',
      resolve: async (_root, args, ctx) => {
        const { _id } = await checkSessionId(ctx.req)
        if (!_id) return ErrorResults.INVALID_SESSION_ERROR

        const graphId = args?.id
        if (graphId) {
          if (!mongoose.Types.ObjectId.isValid(graphId))
            return ErrorResults.NOT_FOUND_ERROR

          const graph = await findGraphById(graphId)
          if (!graph || String(graph?.userId) !== _id)
            return ErrorResults.NOT_FOUND_ERROR

          const nodes = (await findNodesyGraphId(graphId)) ?? []
          const edges = (await findEdgesyGraphId(graphId)) ?? []
          return { ElementsSuccess: { nodes, edges } }
        }

        if ((await getIdeaCount(_id)) >= 10)
          return ErrorResults.MAXIMUM_IDEAS_EXCEEDED_ERROR

        const { id } = await createGraph({ userId: _id })
        return { ElementsSuccess: { id } }
      },
    })
  },
})
/**
 * @name SaveElements
 * @description A mutation type.
 * Save elements.
 */
export const SaveElements = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('saveElements', {
      args: {
        graphId: nonNull(stringArg()),
        picture: nonNull(stringArg()),
        elements: SaveElementsInput,
      },
      type: 'SaveElementsResult',
      resolve: async (_root, args, ctx) => {
        const { _id } = await checkSessionId(ctx.req)
        if (!_id) return ErrorResults.INVALID_SESSION_ERROR

        const { graphId, picture } = args
        const { nodes, edges } = args.elements

        if (picture) {
          const imageUrl: any = await uploadImage(picture, _id, graphId)
          if (!imageUrl) return ErrorResults.UPLOAD_IMAGE_ERROR

          await uploadPicture(graphId, imageUrl)
        }
        await deleteNodesByGraphId(graphId)
        await createNodes(nodes)
        await deleteEdgesByGraphId(graphId)
        await createEdges(edges)

        return { SaveElementsSuccess: {} }
      },
    })
  },
})
/**
 * @name DeleteIdea
 * @description A mutation type.
 * Delete an idea.
 */
export const DeleteIdea = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteIdea', {
      args: {
        graphId: nonNull(stringArg()),
      },
      type: 'DeleteIdeaResult',
      resolve: async (_root, args, ctx) => {
        const { _id } = await checkSessionId(ctx.req)
        if (!_id) return ErrorResults.INVALID_SESSION_ERROR

        const { graphId } = args
        const graph = await findGraphById(graphId)
        if (!graph || String(graph?.userId) !== _id)
          return ErrorResults.NOT_FOUND_ERROR

        if (graph.picture) await removeImage(_id, graphId)
        await deleteGraphById(graphId)
        await deleteNodesByGraphId(graphId)
        await deleteEdgesByGraphId(graphId)

        return { DeleteIdeaSuccess: {} }
      },
    })
  },
})
