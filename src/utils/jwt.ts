import jwt from 'jsonwebtoken'
import CONFIG from '../config/environment'

// eslint-disable-next-line @typescript-eslint/ban-types
export const signJWT = (payload: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(payload, CONFIG.jwt_private, {
    ...(options && options),
    algorithm: 'RS256'
  })
}

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, CONFIG.jwt_public)
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt is expired or not eligible to use',
      decoded: null
    }
  }
}
