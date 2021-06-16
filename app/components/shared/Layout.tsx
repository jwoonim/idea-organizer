import { Flex } from '@chakra-ui/react'
import Head from 'next/head'

import Header from './header'

export default function Layout({ children, ...props }) {
  return (
    <>
      <Head>
        <title>Welcome!</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex direction="column" align="center" w="100%" m="0 auto">
        <Header {...props} />
        {children}
      </Flex>
    </>
  )
}
