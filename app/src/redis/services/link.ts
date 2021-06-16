import { Identifiers } from 'src/utils/constants'
import { redisClient } from '../client'

export function storeLinkId(linkId: string, values: any) {
  return redisClient.set(
    linkId,
    JSON.stringify(values),
    'EX',
    Identifiers.LINK_ID.expiresIn
  )
}

export async function getLinkId(linkId: string): Promise<any> {
  const values: any = await redisClient.get(linkId)
  return !values ? false : JSON.parse(values)
}

export function removeLinkId(linkId: string) {
  return redisClient.del(linkId)
}
