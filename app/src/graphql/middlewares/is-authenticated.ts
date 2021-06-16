import { initializeApollo } from '../apollo'
import { ME } from '../gql'

export function isAuthenticated(req, isAuthRequired?: boolean) {
  return async (ctx) => {
    const resOptions = {
      apolloClient: null,
      user: null,
      isAuthenticated: null,
      redirect: null,
    }
    const sessionId = ctx.req.cookies.SSID || null
    // Redirect if a session ID is not passed.
    if (!sessionId) return req(ctx, resOptions)

    try {
      resOptions.apolloClient = initializeApollo(null, ctx)
      const { data, errors } = await resOptions.apolloClient.query({
        query: ME,
      })
      if (errors)
        return { props: { statusCode: 500, title: 'Internal Server Error' } }

      if (resOptions.user) {
        resOptions.user = null
        resOptions.isAuthenticated = null
      }
      const res = data.me
      if (errors || !res?.user) {
        return req(ctx, resOptions)
      } else {
        resOptions.isAuthenticated = true
        resOptions.user = res.user
        return req(ctx, resOptions)
      }
    } catch (error) {
      console.log('error', error)
      return { props: { statusCode: 500, title: 'Internal Server Error' } }
    }
  }
}
