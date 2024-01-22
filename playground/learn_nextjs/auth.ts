import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from './lib/db'

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' }, // edgeでは、dbを使ったsessionができないので
  ...authConfig,
})
