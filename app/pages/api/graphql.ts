import { ApolloServer } from 'apollo-server-micro'

import { connect } from 'src/database/connect'
import { schema as apolloSchema } from 'src/graphql/schema'
import { ResolverContext } from 'src/graphql/apollo'
import { Secrets } from 'src/utils/constants'

connect() // Connect to mongodb
const schema = apolloSchema
const debug = Secrets.NODE_ENV === 'development'
const context = ({ req, res }: ResolverContext) => ({ req, res })
const playground = { settings: { 'request.credentials': 'include' } }
const apolloServer = new ApolloServer({
  schema,
  debug,
  context,
  playground,
})

export const config = { api: { bodyParser: false } }
export default apolloServer.createHandler({ path: '/api/graphql' })
