import { useMutation } from '@apollo/client'
import NextLink from 'next/link'
import { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  InputRightElement,
  Link,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { useForm } from 'react-hook-form'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import {
  validatePassword,
  validateConfirmPassword,
} from 'components/shared/validate-inputs'
import ErrorMessage from 'components/shared/ErrorMessage'
import FormInput from 'components/shared/FormInput'
import { RESET_PASSWORD } from 'src/graphql/gql'

export default function ResetPassword({ ...props }) {
  const { success, message, setError } = props
  const [resetPassword] = useMutation(RESET_PASSWORD)
  // Router
  const router = useRouter()
  // Form control
  const { handleSubmit, errors, register, formState } = useForm()
  const [errorMessage, setErrorMessage] = useState('') // Error message
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const handlePasswordVisibility = () => setShowPassword(!showPassword)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword)
  // Update component based on mutation result
  const [isPasswordReset, setIsPasswordReset] = useState(false)

  const confirmPasswordValidator = (value) => {
    return validateConfirmPassword(value, password)
  }

  // Form submit
  async function onSubmit(values) {
    try {
      const { password } = values
      const { id } = router.query
      const { data, errors } = await resetPassword({
        variables: { input: { password, id } },
      })

      if (errors)
        return setError({ statusCode: 500, title: 'Internal Server Error' })

      if (data.resetPassword?.success) {
        setIsPasswordReset(true)
      } else {
        setErrorMessage(data.resetPassword.message)
      }
    } catch (error) {
      return setError({ statusCode: 500, title: 'Internal Server Error' })
    }
  }

  return (
    <>
      {success ? (
        <Flex width="full" height="full" align="center" justifyContent="center">
          <Box
            p={8}
            width="390px"
            maxWidth="390px"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
            {isPasswordReset ? (
              <>
                <Text>Your password has been reset successfully!</Text>
                <Text>
                  Sign in with your new password{' '}
                  <NextLink href="/sign-in">
                    <Link color="green.500">here</Link>
                  </NextLink>
                  .
                </Text>
              </>
            ) : (
              <>
                {' '}
                <Box textAlign="center">
                  <Heading>Reset password</Heading>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {errorMessage && (
                    <ErrorMessage
                      message={errorMessage}
                      setMessage={setErrorMessage}
                    />
                  )}
                  <FormInput
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    label="New password"
                    placeholder="********"
                    register={register}
                    validation={validatePassword}
                    error={errors.password}
                    setValue={setPassword}
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
                  <FormInput
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    label="Confirm"
                    placeholder="********"
                    register={register}
                    validation={confirmPasswordValidator}
                    error={errors.confirmPassword}
                  >
                    <InputRightElement width="3rem">
                      <Button
                        h="1.5rem"
                        size="sm"
                        onClick={handleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </FormInput>
                  <Button
                    mt={5}
                    width="full"
                    colorScheme="green"
                    variant="outline"
                    isLoading={formState.isSubmitting}
                    type="submit"
                  >
                    Continue
                  </Button>
                </form>
              </>
            )}
          </Box>
        </Flex>
      ) : (
        <>
          <Text>{message}</Text>
        </>
      )}
    </>
  )
}
