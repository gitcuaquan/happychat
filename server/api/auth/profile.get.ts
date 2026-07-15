import authService from '../../services/auth.service'

export default defineEventHandler(async (event) => {
  const user = event.context.user

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Không có quyền truy cập hoặc token không hợp lệ'
    })
  }

  return await authService.getProfile(user.id)
})
