import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import { MESSAGES } from '../constants/messages'
import { JwtPayload } from '../types/jwt'

export default function jwtValidator(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: MESSAGES.MISSING_AUTH })
  }

  const token = auth.slice(7)

  try {
    const secret = process.env.JWT_SECRET || 'change_this_secret'
    const payload = jwt.verify(token, secret) as JwtPayload
    ;(req as any).user = {
      id: payload.sub,
      email: payload.email,
      roles: payload.role,
    }
    next()
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: MESSAGES.INVALID_TOKEN })
  }
}
