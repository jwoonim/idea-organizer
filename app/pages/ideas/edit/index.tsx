import { useState } from 'react'
import Error from 'next/error'

import Edit from 'components/ideas/edit'
import { initializeApollo } from 'src/graphql/apollo'
import { ELEMENTS } from 'src/graphql/gql'
import { isAuthenticated } from 'src/graphql/middlewares'

export default function EditPage({ ...pageProps }) {
  const { id, elements, statusCode, title } = pageProps
  const [error, setError] = useState({ statusCode, title })
  return (
    <>
      {error.statusCode ? (
        <div style={{ width: '100%' }}>
          <Error statusCode={error.statusCode} title={error.title} />
        </div>
      ) : (
        <Edit id={id} elements={elements} setError={setError} />
      )}
    </>
  )
}

export const getServerSideProps = isAuthenticated(
  async (ctx: any, props): Promise<any> => {
    const { apolloClient, isAuthenticated } = props

    if (!isAuthenticated)
      return { redirect: { destination: '/', permanent: false } }

    try {
      const id = ctx.query?.id
      const _apolloClient = initializeApollo(null, ctx)
      const { data, errors } = await _apolloClient.query({
        variables: { id },
        query: ELEMENTS,
      })
      await _apolloClient.resetStore()

      if (errors)
        return { props: { statusCode: 500, title: 'Internal Server Error' } }
      const res = data.elements

      if (res.success) {
        if (res?.id) {
          const id = res.id
          const elements = []
          let user = Object.assign({}, props.user)
          user.ideaCount = user.ideaCount + 1
          return { props: { user, id, elements } }
        }
        const { nodes, edges } = res
        const elements = nodes ? nodes.concat(edges) : []
        return { props: { id, elements } }
      } else {
        if (
          res.__typename === 'InvalidSessionError' ||
          res.__typename === 'MaximumIdeasExceededError'
        )
          return { props: { statusCode: 403, title: 'Forbidden' } }

        if (res.__typename === 'NotFoundError')
          return { props: { statusCode: 404, title: 'Not Found' } }
      }
    } catch (error) {
      console.log(error)
      return { props: { statusCode: 500, title: 'Internal Server Error' } }
    }
  },
  true
)
