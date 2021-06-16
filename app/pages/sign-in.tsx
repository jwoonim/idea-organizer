import { useState } from 'react'
import Error from 'next/error'

import SignIn from 'components/sign-in'
import { isAuthenticated } from 'src/graphql/middlewares/is-authenticated'

export default function SignInPage({ ...pageProps }) {
  const { statusCode, title } = pageProps
  const [error, setError] = useState({ statusCode, title })
  return (
    <>
      {error.statusCode ? (
        <div style={{ width: '100%' }}>
          <Error statusCode={error.statusCode} title={error.title} />
        </div>
      ) : (
        <SignIn setError={setError} />
      )}
    </>
  )
}

export const getServerSideProps = isAuthenticated(
  async (ctx: any, props): Promise<any> => {
    const { isAuthenticated } = props

    return isAuthenticated
      ? { redirect: { destination: '/ideas', permanent: false } }
      : { props: {} }
  },
  false
)
