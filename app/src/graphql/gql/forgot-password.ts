import { gql } from '@apollo/client'

export const FIND_PASSWORD = gql`
  mutation FindPassword($email: String!) {
    findPassword(email: $email) {
      ... on FindPasswordSuccess {
        __typename
        success
      }
      ... on InvalidInputError {
        __typename
        message
      }
      ... on UserNotFoundError {
        __typename
        message
      }
      ... on SendMailError {
        __typename
        message
      }
    }
  }
`

export const VALIDATE_PASSWORD_RESET_LINK = gql`
  query validatePasswordResetLink($id: String!) {
    validatePasswordResetLink(id: $id) {
      ... on ValidatePasswordResetLinkSuccess {
        __typename
        success
      }
      ... on InvalidInputError {
        __typename
        message
      }
      ... on InvalidLinkError {
        __typename
        message
      }
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput) {
    resetPassword(input: $input) {
      ... on ResetPasswordSuccess {
        __typename
        success
      }
      ... on InvalidInputError {
        __typename
        message
      }
      ... on InvalidLinkError {
        __typename
        message
      }
    }
  }
`
