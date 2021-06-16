import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
} from '@chakra-ui/react'

export default function ErrorMessage({ message, setMessage }) {
  return (
    <>
      <Box mt="4">
        <Alert status="error">
          <AlertIcon />
          <Box flex="1">
            <AlertDescription display="block">{message}</AlertDescription>
          </Box>
        </Alert>
      </Box>
    </>
  )
}
