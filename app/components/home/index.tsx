import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/layout'
import Footer from 'components/shared/footer'

export default function Home() {
  return (
    <>
      <Box position="relative" width="90%" height="calc(100vh - 100px)">
        <Box
          position="absolute"
          top="50%"
          transform="translate(0, -50%)"
          width="100%"
        >
          <Flex
            align={['center', 'center', 'center', 'center']}
            justify={['center', 'center', 'center', 'space-between']}
            direction={['column', 'column', 'column', 'row']}
          >
            <VStack align="stretch" spacing="10px" mt="20px" mb="20px">
              <Heading as="h1" size="2xl">
                World's simplest mind map builder
              </Heading>
              <Text>Organize and structure your ideas easily.</Text>
            </VStack>
            <Box maxW="xl" boxShadow="lg" rounded="md">
              <video loop autoPlay muted>
                <source src="/example.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Footer />
    </>
  )
}
