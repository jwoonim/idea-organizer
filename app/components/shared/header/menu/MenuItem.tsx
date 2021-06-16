import Link from 'next/link'
import { Text } from '@chakra-ui/react'

export default function MenuItem({ to, text, isLast = false }) {
  return (
    <>
      <Text
        mb={{ base: isLast ? 0 : 8, sm: 0 }}
        mr={{ base: 0, sm: isLast ? 0 : 8 }}
        display="block"
      >
        <Link href={to}>{text}</Link>
      </Text>
    </>
  )
}
