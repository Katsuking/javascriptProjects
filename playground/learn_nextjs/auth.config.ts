// this file triggers middleware

import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import { LoginSchema } from '@/schemas'
import { getUserByEmail } from './data/user'

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)
          // !user.password はOAuthを使うケース
          if (!user || !user.password) return null

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          )

          if (isPasswordMatched) return user
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
