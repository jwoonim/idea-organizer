import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import {
  Button,
  Flex,
  Box,
  Heading,
  InputRightElement,
  Link,
  Text,
  Divider,
} from '@chakra-ui/react'

import { validateEmail, validateName } from 'components/shared/validate-inputs'
import { SIGN_UP } from 'src/graphql/gql'
import ErrorMessage from 'components/shared/ErrorMessage'
import FormInput from 'components/shared/FormInput'
import PasswordStrengthBar from './password-strength-bar'
import checkPasswordStrength from './check-password'
import GoogleSignInButton from 'components/shared/GoogleSignInButton'

export default function SignUp({ ...props }) {
  const setErrorObj = props?.setError
  const [signUp] = useMutation(SIGN_UP)
  const [signUpResult, setSignUpResult] = useState(false)
  // Form control
  const {
    handleSubmit,
    errors,
    setError,
    register,
    formState,
    clearErrors,
  } = useForm()
  const [message, setMessage] = useState('')
  const [socialSignInMessage, setSocialSignInMessage] = useState('')
  // Password visibility
  const [showPassword, setShowPassword] = useState(false)
  const handlePasswordVisibility = () => setShowPassword(!showPassword)
  // Password strength
  const [passwordStrength, setPasswordStrength] = useState(null)
  const onPaswordKeyUp = (value) =>
    setPasswordStrength(checkPasswordStrength(value.target.value))
  // Password validation
  const handlePasswordValidation = (value) => {
    const passwordStrength = checkPasswordStrength(value)
    if (!passwordStrength || passwordStrength.id === 0) {
      setError('password', {
        type: 'manual',
        message: '',
      })
      return ''
    } else if (value.length >= 127) {
      return 'Password is too long.'
    } else {
      clearErrors(['password'])
      return true
    }
  }
  // Form submit
  async function onSubmit(values) {
    try {
      const { email, name, password } = values
      const { data, errors } = await signUp({
        variables: { input: { email, name, password } },
      })

      if (errors)
        return setErrorObj({ statusCode: 500, title: 'Internal Server Error' })
      if (data.signUp?.success) {
        setSignUpResult(true)
      } else {
        setMessage(data.signUp.message)
      }
    } catch (error) {
      return setErrorObj({ statusCode: 500, title: 'Internal Server Error' })
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
          {signUpResult ? (
            <>
              <Text>
                We've sent a verification email. Please check your email.
              </Text>
            </>
          ) : (
            <>
              <Box textAlign="center" mb="10">
                <Heading>Sign up</Heading>
              </Box>
              {socialSignInMessage && (
                <ErrorMessage
                  message={socialSignInMessage}
                  setMessage={setSocialSignInMessage}
                />
              )}
              <GoogleSignInButton
                buttonText="Sign up with Google"
                setSocialSignInMessage={setSocialSignInMessage}
              />
              <Flex align="center">
                <Divider />
                <Text color="gray.500">OR</Text>
                <Divider />
              </Flex>
              <form onSubmit={handleSubmit(onSubmit)}>
                {message && (
                  <ErrorMessage message={message} setMessage={setMessage} />
                )}
                <FormInput
                  id="name"
                  name="name"
                  type="name"
                  label="Name"
                  placeholder="Name"
                  register={register}
                  validation={validateName}
                  error={errors.name}
                >
                  <></>
                </FormInput>
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
                  validation={handlePasswordValidation}
                  error={errors.password}
                  onKeyUp={onPaswordKeyUp}
                >
                  <InputRightElement width="3rem">
                    <Button
                      h="1.5rem"
                      size="sm"
                      onClick={handlePasswordVisibility}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </FormInput>
                {formState.dirtyFields.password ? (
                  <PasswordStrengthBar passwordStrength={passwordStrength} />
                ) : (
                  <Text>
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols.
                  </Text>
                )}
                <Button
                  mt={5}
                  width="full"
                  colorScheme="blue"
                  variant="outline"
                  isLoading={formState.isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
                <Box my="5">
                  <Text>
                    Already signed up?{' '}
                    <NextLink href="/sign-in">
                      <Link color="blue.500">Sign in</Link>
                    </NextLink>
                  </Text>
                </Box>
              </form>
            </>
          )}
        </Box>
      </Flex>
    </>
  )
}
