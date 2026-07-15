import BaseRepository from './base.repository'
import type { IUser } from '../models/user'
import User from '../models/user'

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User)
  }

  async findByUsernameWithPassword(username: string): Promise<IUser | null> {
    return await this.model.findOne({ username }).select('+password').exec()
  }
}

const userRepository = new UserRepository()
export default userRepository
