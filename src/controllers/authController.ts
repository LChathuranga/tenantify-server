import { Request, Response, NextFunction } from 'express'
import { signup, login } from '../services/authService'
import { AuthResponse } from '../dto/AuthResponse'

export async function signupHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const result: AuthResponse = await signup(req.body)
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

export async function loginHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const result: AuthResponse = await login(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
}
