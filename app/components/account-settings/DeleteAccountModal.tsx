import { useMutation } from '@apollo/client'
import { Button } from '@chakra-ui/button'
import { useColorMode } from '@chakra-ui/color-mode'
import { FormControl } from '@chakra-ui/form-control'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input } from '@chakra-ui/input'
import { Text, VStack } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { useRouter } from 'next/dist/client/router'
import { useRef, useState } from 'react'

import { DELETE_USER } from 'src/graphql/gql'

export default function DeleteAccountModal({ setError }) {
  const [deleteUser] = useMutation(DELETE_USER)
  // Router
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const initialRef = useRef()
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleValueChange = (e) => {
    e.target.value === 'DELETE'
      ? setDeleteButtonDisabled(false)
      : setDeleteButtonDisabled(true)
  }
  const handleDeleteUser = async () => {
    setIsLoading(true)
    try {
      const { data, errors } = await deleteUser()

      if (errors)
        return setError({ statusCode: 500, title: 'Internal Server Error' })

      if (data.deleteUser?.success) {
        onClose()
        await router.push('/sign-in', undefined, { shallow: true })
      } else {
        if (data.deleteIdea.__typename === 'InvalidSessionError') {
          return setError({ statusCode: 403, title: 'Forbidden' })
        }
      }
    } catch (error) {
      return setError({ statusCode: 500, title: 'Internal Server Error' })
    }
    setIsLoading(false)
  }
  return (
    <>
      <Button onClick={onOpen} mt="10px">
        Delete account
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={colorMode === 'dark' ? '#1b1d21' : '#fff'}>
          <ModalHeader>
            Are you sure you want to delete your account?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing="10px">
              <Text>
                After submitting this form, you'll no longer be able to access
                any of your ideas or log in to Idea Organizer.
              </Text>
              <Text>Type "DELETE" below.</Text>
              <FormControl>
                <Input
                  ref={initialRef}
                  placeholder={'Type the word "DELETE"'}
                  onChange={handleValueChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDeleteUser}
              isDisabled={deleteButtonDisabled}
              isLoading={isLoading}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
