import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types/jwt'

export function generateJwt(payload: JwtPayload, expiresIn: string = '24h'): string {
  const secret = process.env.JWT_SECRET || 'change_this_secret'
  const options: jwt.SignOptions = { expiresIn: expiresIn as any }
  return jwt.sign(payload, secret, options)
}

export function getEmail(token: string): string | null {
  try {
    const secret = process.env.JWT_SECRET || 'change_this_secret'
    const payload = jwt.verify(token, secret) as JwtPayload
    return payload.email || null
  } catch (err) {
    console.error('Error decoding JWT token:', err)
    return null
  }
}