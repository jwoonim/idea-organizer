import { gql } from '@apollo/client'

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput) {
    signUp(input: $input) {
      ... on SignUpSuccess {
        __typename
        success
      }
      ... on InvalidInputError {
        __typename
        message
      }
      ... on EmailConflictError {
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

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($id: String!) {
    verifyEmail(id: $id) {
      ... on VerifyEmailSuccess {
        __typename
        success
      }
      ... on InvalidInputError {
        __typename
        message
      }
      ... on EmailConflictError {
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
