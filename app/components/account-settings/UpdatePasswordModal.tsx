import { useMutation } from '@apollo/client'
import { Button } from '@chakra-ui/button'
import { useColorMode } from '@chakra-ui/color-mode'
import { useDisclosure } from '@chakra-ui/hooks'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { InputRightElement } from '@chakra-ui/input'
import { Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import ErrorMessage from 'components/shared/ErrorMessage'
import FormInput from 'components/shared/FormInput'
import { validatePassword } from 'components/shared/validate-inputs'
import { CHECK_PASSWORD } from 'src/graphql/gql'


export default function UpdatePasswordModal({
  setError,
  setIsPasswordConfirmed,
  isSignUpMethodEmail,
}) {
  const [checkPassword] = useMutation(CHECK_PASSWORD)
  // Router
  const router = useRouter()
  // Form control
  const { handleSubmit, errors, register, formState, reset } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [errorMessage, setErrorMessage] = useState('')
  const { colorMode, toggleColorMode } = useColorMode()
  const [showPassword, setShowPassword] = useState(false)
  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  const onModalClose = () => {
    setErrorMessage('')
    onClose()
    reset()
  }

  const handleCheckPassword = async (values) => {
    try {
      const { password } = values
      const { data, errors } = await checkPassword({
        variables: { password },
      })
      if (errors) return setErrorMessage('Something went wrong.')
      if (data.checkPassword?.success) {
        setIsPasswordConfirmed(true)
        onClose()
      } else {
        return setErrorMessage('The password you entered is incorrect.')
      }
    } catch (error) {
      return setErrorMessage('Something went wrong.')
    }
  }
  return (
    <>
      <Button onClick={onOpen} isDisabled={!isSignUpMethodEmail} mt="10px">
        Update password
      </Button>

      <Modal isOpen={isOpen} onClose={onModalClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={colorMode === 'dark' ? '#1b1d21' : '#fff'}>
          <ModalHeader>Confirm your existing password</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleCheckPassword)}>
            <ModalBody>
              <Text>
                Please confirm your password before updating password.
              </Text>
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
                label=""
                placeholder="********"
                register={register}
                validation={validatePassword}
                error={errors.password}
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
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                isLoading={formState.isSubmitting}
                type="submit"
              >
                Confirm Password
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
