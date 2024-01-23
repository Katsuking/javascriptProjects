import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from '@/lib/db'
import { getUserById } from '@/data/user'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    // when something goes wrong, out of boxで使えるページを使わないようにする
    signIn: '/auth/login',
    error: '/auth/error',
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' }, // edgeでは、dbを使ったsessionができないので
  ...authConfig,
  // sessionにもっと情報を含ませる
  events: {
    async linkAccount({ user }) {
      // GithubやGoogleでsign inする場合は、emailVertifiedカラムを埋める
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // console.log({ user })

      // allow OAuth without email verification
      if (account?.provider !== 'credentials') return true

      // prevent sign in verification email verification
      const existingUser = await getUserById(user.id)
      if (!existingUser?.emailVerified) return false

      // Add 2FA check

      return true
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      // next-auth.d.ts
      // session.user.customField = "anything you want here"

      if (token.role && session.user) {
        session.user.role = token.role
      }

      return session
    },
    async jwt({ token }) {
      console.log({ token }) // token.subはId
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token
      token.role = existingUser.role
      return token
    },
  },
})
