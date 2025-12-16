import { Request, Response, NextFunction } from 'express'
import { logError } from '../utils/logger'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logError(`Error processing request ${req.method} ${req.originalUrl} - ${err && err.message ? err.message : ''}`)
  if (err && err.stack) {
    console.error(err.stack)
  } else {
    console.error(err)
  }

  const status = err.status || 500
  const message = err.message || 'Internal Server Error'
  const response: any = { message }
  if (err.errors) {
    response.errors = err.errors
  }
  res.status(status).json(response)
}
