import { useEffect, useState } from 'react'
import Error from 'next/error'

import Ideas from 'components/ideas'
import { isAuthenticated } from 'src/graphql/middlewares/is-authenticated'
import { initializeApollo } from 'src/graphql/apollo'
import { GET_IDEAS } from 'src/graphql/gql'

export default function IdeasPage({ ...pageProps }) {
  const { statusCode, title } = pageProps
  const [error, setErrorObj] = useState({ statusCode, title })
  const [ideas, setIdeas] = useState(pageProps?.ideas)
  return (
    <>
      {error.statusCode ? (
        <div style={{ width: '100%' }}>
          <Error statusCode={error.statusCode} title={error.title} />
        </div>
      ) : (
        <Ideas ideas={ideas} setIdeas={setIdeas} setErrorObj={setErrorObj} />
      )}
    </>
  )
}

export const getServerSideProps = isAuthenticated(
  async (ctx: any, props): Promise<any> => {
    const { apolloClient, isAuthenticated, user } = props

    if (!isAuthenticated)
      return { redirect: { destination: '/', permanent: false } }

    try {
      const _apolloClient = apolloClient ?? initializeApollo(null, ctx)
      const { data, errors } = await _apolloClient.query({ query: GET_IDEAS })
      await _apolloClient.resetStore()

      if (errors)
        return { props: { statusCode: 500, title: 'Internal Server Error' } }
      const res = data.getIdeas

      if (res?.ideas) {
        const ideas = res.ideas
        return { props: { user, ideas } }
      } else {
        return { redirect: { destination: '/', permanent: false } }
      }
    } catch (error) {
      console.log(error)
      return { props: { statusCode: 500, title: 'Internal Server Error' } }
    }
  },
  true
)
