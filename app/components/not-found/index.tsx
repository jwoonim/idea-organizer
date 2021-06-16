import { Box, Text } from '@chakra-ui/layout'

export default function NotFound() {
  return (
    <>
      <Box position="relative" width="90%" height="calc(100vh - 100px)">
        <Box
          position="absolute"
          top="50%"
          transform="translate(0, -50%)"
          width="100%"
          textAlign="center"
        >
          <Text>404 | Not Found</Text>
        </Box>
      </Box>
    </>
  )
}
