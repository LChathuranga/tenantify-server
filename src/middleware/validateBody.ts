import { Request, Response, NextFunction } from 'express'
import { UserRole } from '../types/userRole'
import { ValidationError } from '../errors/ValidationError'

function isEmail(value: any) {
  return typeof value === 'string' && /\S+@\S+\.\S+/.test(value)
}

export function validateSignupBody(req: Request, res: Response, next: NextFunction) {
  if (!req.body || typeof req.body !== 'object') {
    return next(new ValidationError(400, 'Invalid request body', ['Request body must be a valid JSON object']))
  }
  const { fullName, email, password, role } = req.body
  const errors: string[] = []
  if (!fullName || typeof fullName !== 'string') errors.push('fullName is required')
  if (!email || !isEmail(email)) errors.push('valid email is required')
  if (!password || typeof password !== 'string' || password.length < 6) errors.push('password of minimum 6 characters required')
  if (role && !Object.values(UserRole).includes(role)) errors.push('invalid role')
  if (errors.length) return next(new ValidationError(400, 'Validation failed', errors))
  next()
}

export function validateLoginBody(req: Request, res: Response, next: NextFunction) {
  if (!req.body || typeof req.body !== 'object') {
    return next(new ValidationError(400, 'Invalid request body', ['Request body must be a valid JSON object']))
  }
  const { email, password } = req.body
  const errors: string[] = []
  if (!email || !isEmail(email)) errors.push('valid email is required')
  if (!password || typeof password !== 'string') errors.push('password is required')
  if (errors.length) return next(new ValidationError(400, 'Validation failed', errors))
  next()
}
