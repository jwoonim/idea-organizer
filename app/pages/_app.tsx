import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { useApollo } from 'src/graphql/apollo'
import { ChakraProvider } from '@chakra-ui/react'

import theme from 'styles/theme'
import Layout from 'components/shared/Layout'
import IdeaCountContextProvider from 'components/shared/contexts/idea-count'

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <IdeaCountContextProvider {...pageProps}>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </IdeaCountContextProvider>
      </ApolloProvider>
    </ChakraProvider>
  )
}
