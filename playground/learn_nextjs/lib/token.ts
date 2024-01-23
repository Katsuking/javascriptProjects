import { getVerificationTokenByEmail } from '@/data/verification-token'
import { v4 as uuidv4 } from 'uuid'
import { db } from './db'

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
