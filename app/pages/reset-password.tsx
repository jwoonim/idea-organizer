import { useState } from 'react'
import Error from 'next/error'

import { isAuthenticated } from 'src/graphql/middlewares/is-authenticated'
import ResetPassword from 'components/reset-password'
import { initializeApollo } from 'src/graphql/apollo'
import { VALIDATE_PASSWORD_RESET_LINK } from 'src/graphql/gql'

export default function ResetPasswordPage({ ...pageProps }) {
  const { success, message, statusCode, title } = pageProps
  const [error, setError] = useState({ statusCode, title })
  return (
    <>
      {error.statusCode ? (
        <div style={{ width: '100%' }}>
          <Error statusCode={error.statusCode} title={error.title} />
        </div>
      ) : (
        <ResetPassword
          success={success}
          message={message}
          setError={setError}
        />
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
      const { data, errors } = await _apolloClient.query({
        variables: { id: ctx.query.id },
        query: VALIDATE_PASSWORD_RESET_LINK,
      })

      if (errors)
        return { props: { statusCode: 500, title: 'Internal Server Error' } }

      const res = data.validatePasswordResetLink
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
