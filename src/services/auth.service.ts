import type UserType from '../types/user.type'
import userModel from '../models/user.model'

export const createUser = async (payload: UserType) => {
  return await userModel.create(payload)
}

export const findUserByEmail = async (email: string) => {
  return await userModel.findOne({ email })
}
