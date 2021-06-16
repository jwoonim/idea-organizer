import { Box, Heading, Image } from '@chakra-ui/react'
import Link from 'next/link'

export default function Logo() {
  return (
    <>
      <Box w="50px" h="50px" cursor="pointer">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" />
        </Link>
      </Box>
    </>
  )
}
