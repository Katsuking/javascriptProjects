// this file triggers middleware

import GitHub from 'next-auth/providers/github'

import type { NextAuthConfig } from 'next-auth'

export default {
  providers: [GitHub],
} satisfies NextAuthConfig
