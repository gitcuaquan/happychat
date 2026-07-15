import jwt from 'jsonwebtoken'
import userRepository from '../repositories/user.repository'

const generateToken = (id: string, secret: string, expiresIn: string) => {
  return jwt.sign({ id }, secret, {
    expiresIn: expiresIn as any
  })
}

interface RegisterDTO {
  username: string
  password?: string
  fullName?: string
}

interface LoginDTO {
  username: string
  password?: string
}

class AuthService {
  async register({ username, password, fullName }: RegisterDTO) {
    const config = useRuntimeConfig()
    const userExists = await userRepository.findOne({ username })

    if (userExists) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tên người dùng đã tồn tại'
      })
    }

    const user = await userRepository.create({
      username,
      password,
      fullName
    })

    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Dữ liệu không hợp lệ'
      })
    }

    const token = generateToken(user.id, config.jwtSecret as string, config.jwtExpiresIn as string)
    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      token
    }
  }

  async login({ username, password }: LoginDTO) {
    const config = useRuntimeConfig()
    const user = await userRepository.findByUsernameWithPassword(username)

    if (!user || !password || !(await user.matchPassword(password))) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Sai tài khoản hoặc mật khẩu'
      })
    }

    const token = generateToken(user.id, config.jwtSecret as string, config.jwtExpiresIn as string)
    return { token }
  }

  async getProfile(userId: string) {
    const user = await userRepository.findById(userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Không tìm thấy người dùng'
      })
    }
    return user.toJSON()
  }
}

const authService = new AuthService()
export default authService
