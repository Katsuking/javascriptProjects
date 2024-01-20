'use server'

import { LoginSchema } from '@/schemas'
import * as z from 'zod'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values)

  // client側のvalidationは簡単にbypassできてしまうので,server側でもしっかりvalidationはいる
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  return { success: 'Email sent!' }
}
