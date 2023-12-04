import bcrypt from 'bcrypt'

// encode
export const hasing = (password: string) => {
  return bcrypt.hashSync(password, 10)
}

// decode
export const checkPassword = (password: string, userPassword: string) => {
  return bcrypt.compareSync(password, userPassword)
}
