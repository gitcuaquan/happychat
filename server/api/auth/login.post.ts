import { z } from 'zod'
import authService from '../../services/auth.service'

const loginSchema = z.object({
  username: z.string({
    error: () => 'Trường username là bắt buộc'
  }).min(1, 'Username không được để trống'),

  password: z.string({
    error: () => 'Trường password là bắt buộc'
  }).min(1, 'Password không được để trống')
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const parseResult = loginSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parseResult.error?.issues[0]?.message || 'Dữ liệu không hợp lệ'
    })
  }

  return await authService.login(parseResult.data)
})
