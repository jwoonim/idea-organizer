import { gql } from '@apollo/client'

export const CHECK_PASSWORD = gql`
  mutation CheckPassword($password: String!) {
    checkPassword(password: $password) {
      ... on CheckPasswordSuccess {
        __typename
        success
      }
      ... on InvalidInputError {
        __typename
        message
      }
      ... on InvalidSessionError {
        __typename
        message
      }
      ... on IncorrectCredentialsError {
        __typename
        message
      }
    }
  }
`

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($password: String!) {
    updatePassword(password: $password) {
      ... on UpdatePasswordSuccess {
        __typename
        success
      }
      ... on InvalidInputError {
        __typename
        message
      }
      ... on InvalidSessionError {
        __typename
        message
      }
      ... on PasswordMatchedError {
        __typename
        message
      }
    }
  }
`
