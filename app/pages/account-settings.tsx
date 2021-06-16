import { useState } from 'react'
import Error from 'next/error'

import { isAuthenticated } from 'src/graphql/middlewares/is-authenticated'
import AccountSettings from 'components/account-settings'

export default function AccountSettingsPage({ ...pageProps }) {
  const { user, statusCode, title } = pageProps
  const [error, setError] = useState({ statusCode, title })
  return (
    <>
      {error.statusCode ? (
        <div style={{ width: '100%' }}>
          <Error statusCode={error.statusCode} title={error.title} />
        </div>
      ) : (
        <AccountSettings user={user} setErrorObj={setError} />
      )}
    </>
  )
}

export const getServerSideProps = isAuthenticated(
  async (ctx: any, props): Promise<any> => {
    const { user, isAuthenticated } = props
    
    return !isAuthenticated
      ? { redirect: { destination: '/', permanent: false } }
      : { props: { user } }
  },
  false
)
