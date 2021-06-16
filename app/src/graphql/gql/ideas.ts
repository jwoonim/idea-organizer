import { gql } from '@apollo/client'

export const ELEMENTS = gql`
  query Elements($id: String) {
    elements(id: $id) {
      ... on ElementsSuccess {
        __typename
        nodes {
          _id
          graphId
          id
          type
          data {
            label
            color
          }
          position {
            x
            y
          }
        }
        edges {
          _id
          graphId
          id
          type
          source
          target
        }
        id
        success
      }
      ... on InvalidSessionError {
        __typename
        message
      }
      ... on NotFoundError {
        __typename
        message
      }
    }
  }
`

export const SAVE_ELEMENTS = gql`
  mutation SaveElements(
    $graphId: String!
    $picture: String!
    $elements: SaveElementsInput
  ) {
    saveElements(graphId: $graphId, picture: $picture, elements: $elements) {
      ... on SaveElementsSuccess {
        __typename
        success
      }
      ... on InvalidSessionError {
        __typename
        message
      }
    }
  }
`

export const GET_IDEAS = gql`
  query {
    getIdeas {
      ... on GetIdeasSuccess {
        __typename
        ideas {
          _id
          picture
          updatedAt
        }
      }
      ... on InvalidSessionError {
        __typename
        message
      }
    }
  }
`

export const DELETE_IDEA = gql`
  mutation DeleteIdea($graphId: String!) {
    deleteIdea(graphId: $graphId) {
      ... on DeleteIdeaSuccess {
        __typename
        success
      }
      ... on InvalidSessionError {
        __typename
        message
      }
      ... on NotFoundError {
        __typename
        message
      }
    }
  }
`
