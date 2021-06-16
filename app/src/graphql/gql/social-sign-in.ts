import { gql } from '@apollo/client'

export const SOCIAL_SIGN_IN = gql`
  mutation SocialSignIn($token: String!) {
    socialSignIn(token: $token) {
      ... on SocialSignInSuccess {
        __typename
        success
      }
      ... on InvalidInputError {
        __typename
        message
      }
      ... on InvalidTokenError {
        __typename
        message
      }
      ... on SignUpMethodError {
        __typename
        message
      }
      ... on EmailVerificationError {
        __typename
        message
      }
    }
  }
`
