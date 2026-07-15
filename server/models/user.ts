import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Vui lòng cung cấp tên người dùng'],
      trim: true,
      minlength: [6, 'Tên người dùng tối thiểu 6 ký tự'],
      maxlength: [32, 'Tên người dùng tối đa 32 ký tự']
    },
    password: {
      type: String,
      required: [true, 'Vui lòng cung cấp mật khẩu'],
      minlength: [6, 'Mật khẩu tối thiểu 6 ký tự'],
      select: false
    },
    fullName: {
      type: String,
      trim: true,
      minlength: [2, 'Họ tên tối thiểu 2 ký tự'],
      maxlength: [32, 'Họ tên tối đa 32 ký tự'],
      default: 'Bé Gạo'
    },
    avatarUrl: {
      type: String,
      trim: true,
      default: 'https://api.dicebear.com/10.x/big-smile/svg?seed=o5lgii8t'
    },
    isSuperAdmin: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return
  }
  const salt = await bcrypt.genSalt(10)
  if (this.password) {
    this.password = await bcrypt.hash(this.password, salt)
  }
})

// Method to match password
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Format data for JSON output
userSchema.set('toJSON', {
  transform(doc, ret: any) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.password
    return ret
  }
})

// Mongoose model types
export interface IUser extends mongoose.Document {
  id: string
  username: string
  password?: string
  fullName: string
  avatarUrl: string
  isSuperAdmin: boolean
  isActive: boolean
  matchPassword(enteredPassword: string): Promise<boolean>
}

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)
export default User
