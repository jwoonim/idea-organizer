export const Identifiers = {
  LINK_ID: {
    expiresIn: 86400,
  },
  SESSION_ID: {
    name: 'SSID',
    expiresIn: 2630000,
  },
} as const

export type Identifier = typeof Identifiers[keyof typeof Identifiers]
