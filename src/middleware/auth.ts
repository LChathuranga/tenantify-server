import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { MESSAGES } from '../constants/messages'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user
  if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: MESSAGES.UNAUTHORIZED })
  next()
}

export function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: MESSAGES.UNAUTHORIZED })
    const roles: string[] = user.roles || []
    if (!roles.includes(role)) return res.status(StatusCodes.FORBIDDEN).json({ message: MESSAGES.FORBIDDEN })
    next()
  }
}
