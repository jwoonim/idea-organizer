import { IncomingMessage } from 'http'

import { getSessionId } from 'src/redis/services'

export async function checkSessionId(req: IncomingMessage) {
  // Return false if a session ID is invalid.
  const sessionId = req['cookies'].SSID || null
  if (!sessionId) return false
  const _id = await getSessionId(sessionId)
  return _id ? _id : false
}
