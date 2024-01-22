import NextAuth, { DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  role: 'ADMIN' | 'USER'
  customField: string
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}
