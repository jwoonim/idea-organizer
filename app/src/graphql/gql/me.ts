import { gql } from '@apollo/client'

export const ME = gql`
  query {
    me {
      ... on MeSuccess {
        __typename
        user {
          _id
          email
          name
          picture
          signUpMethod
          ideaCount
        }
      }
      ... on InvalidSessionError {
        __typename
        message
      }
      ... on UserNotFoundError {
        __typename
        message
      }
    }
  }
`
