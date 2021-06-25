import redis from 'redis'

import { Secrets } from 'src/utils/constants'

export const redisClient = redis.createClient(
  Number(Secrets.REDIS_PORT),
  Secrets.REDIS_HOST,
  { retry_strategy: () => 1000 }
)

// Promisify the get function.
const util = require('util')
redisClient.get = util.promisify(redisClient.get)
