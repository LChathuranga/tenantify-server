import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types/jwt'

export function generateJwt(payload: JwtPayload, expiresIn: string = '24h'): string {
  const secret = process.env.JWT_SECRET || 'change_this_secret'
  const options: jwt.SignOptions = { expiresIn: expiresIn as any }
  return jwt.sign(payload, secret, options)
}
