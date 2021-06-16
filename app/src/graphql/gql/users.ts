import { gql } from '@apollo/client'

export const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser {
      ... on DeleteUserSuccess {
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
