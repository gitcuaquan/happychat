import { z } from 'zod'
import authService from '../../services/auth.service'

const registerSchema = z.object({
  username: z.string({
    error: () => 'Trường username là bắt buộc'
  })
    .min(6, 'Username phải có ít nhất 6 ký tự')
    .max(32, 'Username không được vượt quá 32 ký tự')
    .regex(/^[a-zA-Z0-9]+$/, 'Username chỉ được chứa chữ cái và số'),

  password: z.string({
    error: () => 'Trường password là bắt buộc'
  })
    .min(8, 'Password phải có ít nhất 8 ký tự')
    .max(32, 'Password không được vượt quá 32 ký tự'),

  fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự').max(32, 'Họ tên không được vượt quá 32 ký tự').optional()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const parseResult = registerSchema.safeParse(body)
  if (!parseResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parseResult.error?.issues[0]?.message || 'Dữ liệu không hợp lệ'
    })
  }

  return await authService.register(parseResult.data)
})
