import { useMutation } from '@apollo/client'
import { Box, Button, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import GoogleLogin from 'react-google-login'

import { SOCIAL_SIGN_IN } from 'src/graphql/gql'

export default function GoogleSignInButton({ ...props }) {
  const { buttonText, setSocialSignInMessage } = props
  const [socialSignIn] = useMutation(SOCIAL_SIGN_IN)
  // Router
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  // Sign in with Google
  const onGoogleSuccess = async (response) => {
    try {
      const { tokenId } = response
      const { data, errors } = await socialSignIn({
        variables: { token: tokenId },
      })

      if (errors) {
        setIsLoading(false)
        return setSocialSignInMessage('Something went wrong.')
      }
      if (data.socialSignIn?.success) {
        await router.push('/ideas')
      } else {
        setSocialSignInMessage(data.socialSignIn.message)
        setIsLoading(false)
      }
    } catch (error) {
      setSocialSignInMessage('Something went wrong.')
      setIsLoading(false)
    }
  }
  const onGoogleFailure = (error) => {
    console.log(error)
    setIsLoading(false)
  }
  const onClick = (onClick) => {
    setIsLoading(true)
    onClick()
  }

  return (
    <>
      <Flex direction="column" my="10px">
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="Sign in with Google"
          onSuccess={onGoogleSuccess}
          onFailure={onGoogleFailure}
          cookiePolicy={'single_host_origin'}
          render={(renderProps) => (
            <Button
              onClick={() => onClick(renderProps.onClick)}
              disabled={isLoading}
              colorScheme="blue"
              variant="outline"
              isLoading={isLoading}
            >
              <Box mr="10px" p="10px" borderRadius="2">
                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#000" fillRule="evenodd">
                    <path
                      d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
                      fill="#EA4335"
                    />
                    <path
                      d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                      fill="#4285F4"
                    />
                    <path
                      d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
                      fill="#34A853"
                    />
                    <path fill="none" d="M0 0h18v18H0z" />
                  </g>
                </svg>
              </Box>
              {buttonText}
            </Button>
          )}
        />
      </Flex>
    </>
  )
}
