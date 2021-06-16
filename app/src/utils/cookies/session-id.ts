import { Identifiers } from '../constants'
import { createCookie } from './cookie'

export const createSessionIdCookie = (sessionId: string) => {
  return createCookie(
    Identifiers.SESSION_ID.name,
    sessionId,
    Identifiers.SESSION_ID.expiresIn
  )
}
