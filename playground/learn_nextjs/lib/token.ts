import { v4 as uuidv4 } from 'uuid'
import { db } from './db'
import { getVerificationTokenByEmail } from '@/data/verification-token'
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token'

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // one hour

  const existingToken = await getVerificationTokenByEmail(email)
  if (existingToken) {
    // dbのトークンは一旦削除
    await db.verficationToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const verficationToken = db.verficationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return verficationToken
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // one hour

  // すでにトークンが存在している場合は削除
  const existingToken = await getPasswordResetTokenByEmail(email)
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    })
  }

  // トークン等のデータをDBに書き込む
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return passwordResetToken
}
