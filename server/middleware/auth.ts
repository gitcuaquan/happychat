import jwt from 'jsonwebtoken'
import userRepository from '../repositories/user.repository'

export default defineEventHandler(async (event) => {
  const path = getRequestPath(event)

  // Bỏ qua kiểm tra token đối với các tuyến đường public đăng ký và đăng nhập
  if (path.includes('/api/auth/register') || path.includes('/api/auth/login')) {
    return
  }

  const config = useRuntimeConfig()
  const headers = getRequestHeaders(event)
  const authHeader = headers.authorization

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    if (token) {
      try {
        const decoded = jwt.verify(token, config.jwtSecret as string) as jwt.JwtPayload
        if (decoded && decoded.id) {
          const user = await userRepository.findById(decoded.id, '-password')
          if (user) {
            event.context.user = user
          }
        }
      } catch (error: any) {
        throw createError({
          statusCode: error.statusCode || 500,
          statusMessage: error.statusMessage || 'Internal Server Error',
          message: error.message || 'Đã có lỗi xảy ra ở phía server!',
          fatal: true // Ép Nuxt hiển thị trang lỗi ứng dụng nếu cần
        })
      }
    }
  }
})
