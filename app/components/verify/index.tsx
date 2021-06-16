import { Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Verify({ ...props }) {
  const { success, message } = props
  return (
    <>
      {success ? (
        <Text>
          Your email has been verified! Please sign in{' '}
          <NextLink href="/sign-in">
            <Link color="green.500">here</Link>
          </NextLink>
          .
        </Text>
      ) : (
        <>
          <Text>{message}</Text>
        </>
      )}
    </>
  )
}
