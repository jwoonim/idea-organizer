import { useMutation } from '@apollo/client'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Box,
  Heading,
  InputRightElement,
  Text,
  Link,
  Divider,
} from '@chakra-ui/react'

import {
  validateEmail,
  validatePassword,
} from 'components/shared/validate-inputs'
import { SIGN_IN } from 'src/graphql/gql'
import ErrorMessage from 'components/shared/ErrorMessage'
import FormInput from 'components/shared/FormInput'
import GoogleSignInButton from 'components/shared/GoogleSignInButton'

export default function SignIn({ ...props }) {
  const { setError } = props
  const [signIn] = useMutation(SIGN_IN)
  // Router
  const router = useRouter()
  // Form control
  const { handleSubmit, errors, register, formState } = useForm()
  const [signInMessage, setSignInMessage] = useState('')
  const [socialSignInMessage, setSocialSignInMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const handlePasswordVisibility = () => setShowPassword(!showPassword)
  // Sign in with email
  const onSubmit = async (values) => {
    try {
      const { email, password } = values
      const { data, errors } = await signIn({
        variables: { input: { email, password } },
      })

      if (errors)
        return setError({ statusCode: 500, title: 'Internal Server Error' })

      if (data.signIn?.success) {
        await router.push('/ideas')
      } else {
        setSignInMessage(data.signIn.message)
      }
    } catch (error) {
      return setError({ statusCode: 500, title: 'Internal Server Error' })
    }
  }

  return (
    <>
      <Flex
        width="full"
        height="full"
        align="center"
        justifyContent="center"
        mt="20px"
      >
        <Box
          p={8}
          width="390px"
          maxWidth="390px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center" mb="10">
            <Heading>Sign in</Heading>
          </Box>
          {socialSignInMessage && (
            <ErrorMessage
              message={socialSignInMessage}
              setMessage={setSocialSignInMessage}
            />
          )}
          <GoogleSignInButton
            buttonText="Sign in with Google"
            setSocialSignInMessage={setSocialSignInMessage}
          />
          <Flex align="center">
            <Divider />
            <Text color="gray.500">OR</Text>
            <Divider />
          </Flex>
          <form onSubmit={handleSubmit(onSubmit)}>
            {signInMessage && (
              <ErrorMessage
                message={signInMessage}
                setMessage={setSignInMessage}
              />
            )}
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="Email"
              register={register}
              validation={validateEmail}
              error={errors.email}
            >
              <></>
            </FormInput>
            <FormInput
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="********"
              register={register}
              validation={validatePassword}
              error={errors.password}
            >
              <InputRightElement width="3rem">
                <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </FormInput>
            <Button
              mt={5}
              width="full"
              colorScheme="blue"
              variant="outline"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              Sign in
            </Button>
            <Box mt="5">
              <Text>
                <NextLink href="/find-password">
                  <Link color="blue.500">Forgot password?</Link>
                </NextLink>
              </Text>
            </Box>
            <Box mt="5">
              <Text>
                New to here?{' '}
                <NextLink href="/sign-up">
                  <Link color="blue.500">Sign up</Link>
                </NextLink>
              </Text>
            </Box>
          </form>
        </Box>
      </Flex>
    </>
  )
}
