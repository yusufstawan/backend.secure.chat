import bcrypt from 'bcrypt'

// encode
export const hasing = (password: string) => {
  return bcrypt.hashSync(password, 10)
}
