import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    name: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: 'reguler'
    }
  },
  { timestamps: true }
)

const userModel = mongoose.model('user', userSchema)

export default userModel
