import { Flex } from '@chakra-ui/react'

export default function Nav({ children }) {
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        p={8}
        boxShadow="0 0 8px 0 rgb(0 0 0 / 12%)"
      >
        {children}
      </Flex>
    </>
  )
}
