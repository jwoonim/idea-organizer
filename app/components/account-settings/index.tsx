import { useMutation } from '@apollo/client'
import { Alert, AlertIcon } from '@chakra-ui/alert'
import { Button } from '@chakra-ui/button'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { InputRightElement } from '@chakra-ui/input'
import { Box, StackDivider, Text, VStack } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UPDATE_PASSWORD } from 'src/graphql/gql'

import ErrorMessage from 'components/shared/ErrorMessage'
import FormInput from 'components/shared/FormInput'
import checkPasswordStrength from 'components/sign-up/check-password'
import PasswordStrengthBar from 'components/sign-up/password-strength-bar'
import DeleteAccountModal from './DeleteAccountModal'
import UpdatePasswordModal from './UpdatePasswordModal'

export default function AccountSettings({ user, setErrorObj }) {
  const [updatePassword] = useMutation(UPDATE_PASSWORD)
  // Form control
  const {
    handleSubmit,
    errors,
    setError,
    register,
    formState,
    clearErrors,
  } = useForm()
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false)
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false)
  const [isSignUpMethodEmail, setIsSignUpMethodEmail] = useState(false)
  const [message, setMessage] = useState('')
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
  async function handleUpdatePassword(values) {
    try {
      const { password } = values
      const { data, errors } = await updatePassword({
        variables: { password },
      })

      if (errors)
        return setErrorObj({ statusCode: 500, title: 'Internal Server Error' })
      if (data.updatePassword?.success) {
        setIsPasswordUpdated(true)
        setIsPasswordConfirmed(false)
      } else {
        setMessage(data.updatePassword.message)
      }
    } catch (error) {
      return setErrorObj({ statusCode: 500, title: 'Internal Server Error' })
    }
  }
  useEffect(() => {
    if (user.signUpMethod === 'Email') setIsSignUpMethodEmail(true)
  })

  return (
    <>
      <Box position="relative" width="90%" height="calc(100vh - 100px)">
        <Box
          position="absolute"
          top="50%"
          transform="translate(0, -50%)"
          width="100%"
          display="flex"
          justifyContent="center"
        >
          <VStack
            mt="10px"
            spacing="50px"
            align="stretch"
            width="390px"
            maxWidth="390px"
            divider={<StackDivider borderColor="gray.500" />}
          >
            <VStack spacing="10px" align="stretch">
              {isPasswordUpdated ? (
                <Alert status="success" variant="subtle" mb="20px">
                  <AlertIcon />
                  Your password has updated!
                </Alert>
              ) : (
                <></>
              )}
              <Box>
                <Text>Update your password</Text>
              </Box>
              <Box>
                <Text color="gray.500">
                  {`You have signed up with your ${user.signUpMethod} account`}
                </Text>
              </Box>
              <Box>
                {isPasswordConfirmed ? (
                  <form onSubmit={handleSubmit(handleUpdatePassword)}>
                    {message && (
                      <ErrorMessage message={message} setMessage={setMessage} />
                    )}
                    <FormInput
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      label=""
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
                      <PasswordStrengthBar
                        passwordStrength={passwordStrength}
                      />
                    ) : (
                      <Text>
                        Use 8 or more characters with a mix of letters, numbers
                        & symbols.
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
                      Save
                    </Button>
                  </form>
                ) : (
                  <UpdatePasswordModal
                    setError={setError}
                    setIsPasswordConfirmed={setIsPasswordConfirmed}
                    isSignUpMethodEmail={isSignUpMethodEmail}
                  />
                )}
              </Box>
            </VStack>
            <VStack spacing="10px" align="stretch">
              <Box>
                <Text>Delete your account</Text>
              </Box>
              <Box>
                <Text color="gray.500">
                  By deleting your account, you'll no longer be able to access
                  any of your ideas or log in to IO.
                </Text>
              </Box>
              <Box>
                <DeleteAccountModal setError={setError} />
              </Box>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </>
  )
}
