// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution
// Best practice for instantiating PrismaClient with Next.js

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient()

// 現在の実行環境がプロダクション環境ではない場合に、prismaをglobalForPrisma.prismaに代入
// 開発環境やテスト環境などでPrismaクライアントのインスタンスをグローバルに共有
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma



