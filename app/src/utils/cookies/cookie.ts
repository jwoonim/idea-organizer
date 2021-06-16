import { ServerResponse } from 'http'
import { serialize } from 'cookie'

import { Secrets } from '../constants'

export const createCookie = (
  name: string,
  value: string,
  expiresIn: number
) => {
  const cookie = serialize(name, value, {
    secure: Secrets.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
    maxAge: expiresIn,
    path: '/',
  })
  return `${cookie};`
}

export const expireCookieItem = (tokenName: string) => {
  return serialize(tokenName, '', {
    secure: Secrets.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
    maxAge: -1,
    path: '/',
  })
}

export const removeCookie = ([...tokenName], res: ServerResponse) => {
  const cookies = tokenName.map((x) => (x = expireCookieItem(x)))
  res.setHeader('Set-Cookie', cookies)
}

export const setCookie = ([...cookies], res: ServerResponse) => {
  res.setHeader('Set-Cookie', cookies)
}
