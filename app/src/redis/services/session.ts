import { Identifiers } from 'src/utils/constants'

import { redisClient } from '../client'

export function storeSessionId(sessionId: string, data: {}) {
  return redisClient.set(
    sessionId,
    JSON.stringify(data),
    'EX',
    Identifiers.SESSION_ID.expiresIn
  )
}

export async function getSessionId(sessionId: string): Promise<any> {
  const res: any = await redisClient.get(sessionId)
  return res ? JSON.parse(res) : false
}

export function removeSessionId(sessionId: string) {
  return redisClient.del(sessionId)
}
