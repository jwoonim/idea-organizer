import { useState } from 'react'
import Error from 'next/error'

import { initializeApollo } from 'src/graphql/apollo'
import { isAuthenticated } from 'src/graphql/middlewares/is-authenticated'
import { VERIFY_EMAIL } from 'src/graphql/gql'
import Verify from 'components/verify'

export default function VerifyPage({ ...pageProps }) {
  const { statusCode, title } = pageProps
  const [error, setError] = useState({ statusCode, title })
  return (
    <>
      {error.statusCode ? (
        <div style={{ width: '100%' }}>
          <Error statusCode={error.statusCode} title={error.title} />
        </div>
      ) : (
        <Verify {...pageProps} />
      )}
    </>
  )
}

export const getServerSideProps = isAuthenticated(
  async (ctx, props): Promise<any> => {
    let { apolloClient, isAuthenticated } = props
    if (!ctx.query?.id || isAuthenticated)
      return { redirect: { destination: '/', permanent: false } }

    try {
      const _apolloClient: any = apolloClient ?? initializeApollo(null, ctx)
      const { data, errors } = await _apolloClient.mutate({
        variables: { id: ctx.query.id },
        mutation: VERIFY_EMAIL,
      })

      if (errors)
        return { props: { statusCode: 500, title: 'Internal Server Error' } }

      const res = data.verifyEmail

      return res?.success
        ? {
            props: { success: true, message: '' },
          }
        : {
            props: { success: false, message: res.message },
          }
    } catch (error) {
      return { props: { statusCode: 500, title: 'Internal Server Error' } }
    }
  },
  false
)
