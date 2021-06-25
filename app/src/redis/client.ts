import Redis from 'ioredis'

import { Secrets } from 'src/utils/constants'

export const redisClient = new Redis(
  Number(Secrets.REDIS_PORT),
  Secrets.REDIS_HOST,
  { retryStrategy: () => 1000 }
)

// Promisify the get function.
const util = require('util')
redisClient.get = util.promisify(redisClient.get)
