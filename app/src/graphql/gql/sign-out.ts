import { gql } from '@apollo/client'

export const SIGN_OUT = gql`
  mutation {
    signOut {
      ... on SignOutSuccess {
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
