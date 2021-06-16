// import redis from 'redis'
import Redis from 'ioredis'

import { Secrets } from 'src/utils/constants'

// export const redisClient = redis.createClient({
//   host: Secrets.REDIS_HOST,
//   port: Number(Secrets.REDIS_PORT),
// })

export const redisClient = new Redis(
  Number(Secrets.REDIS_PORT),
  Secrets.REDIS_HOST
)

// Promisify the get function.
const util = require('util')
redisClient.get = util.promisify(redisClient.get)
