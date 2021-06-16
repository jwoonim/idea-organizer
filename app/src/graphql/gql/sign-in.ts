import { gql } from '@apollo/client'

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput) {
    signIn(input: $input) {
      ... on SignInSuccess {
        __typename
        success
      }
      ... on InvalidInputError {
        __typename
        message
      }
      ... on SignUpMethodError {
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
