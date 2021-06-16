import { CloseButton as CloseBtn, Flex, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'

export default function CloseButton() {
  const router = useRouter()

  return (
    <>
      <Flex width="100%">
        <Spacer />
        <CloseBtn size="lg" onClick={(e) => router.push('/')}></CloseBtn>
      </Flex>
    </>
  )
}
