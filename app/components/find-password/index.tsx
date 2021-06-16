import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { useForm } from 'react-hook-form'

import { validateEmail } from 'components/shared/validate-inputs'
import ErrorMessage from 'components/shared/ErrorMessage'
import FormInput from 'components/shared/FormInput'
import { FIND_PASSWORD } from 'src/graphql/gql'

export default function FindPassword({ ...props }) {
  const { setError } = props
  const [findPassword] = useMutation(FIND_PASSWORD)
  // Router
  const router = useRouter()
  // Form control
  const { handleSubmit, errors, register, formState } = useForm()
  const [message, setMessage] = useState('') // Error message
  const [isEmailSent, setIsEmailSent] = useState(false)

  // Form submit
  async function onSubmit(values) {
    try {
      const { email } = values
      const { data, errors }: any = await findPassword({ variables: { email } })

      if (errors)
        return setError({ statusCode: 500, title: 'Internal Server Error' })

      if (data.findPassword?.success) {
        setIsEmailSent(true)
      } else {
        data.findPassword.__typename == 'UserNotFoundError'
          ? setMessage(
              "We couldn't find an account with the email you entered."
            )
          : setMessage(data.findPassword.message)
      }
    } catch (error) {
      return setError({ statusCode: 500, title: 'Internal Server Error' })
    }
  }

  return (
    <>
      <Flex width="full" height="full" align="center" justifyContent="center">
        <Box
          p={8}
          width="390px"
          maxWidth="390px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          {isEmailSent ? (
            <>
              <Text>We have sent you a link to reset your password!</Text>
            </>
          ) : (
            <>
              <Box textAlign="center">
                <Heading>Forgotten your password?</Heading>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                {message && (
                  <ErrorMessage message={message} setMessage={setMessage} />
                )}
                <FormInput
                  id="email"
                  name="email"
                  type="email"
                  label="We will send you a link to reset your password."
                  placeholder="Email"
                  register={register}
                  validation={validateEmail}
                  error={errors.email}
                >
                  <></>
                </FormInput>
                <Button
                  mt={5}
                  width="full"
                  colorScheme="blue"
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
    </>
  )
}
