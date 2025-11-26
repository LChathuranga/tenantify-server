import { Request, Response, NextFunction } from 'express'
import { logError } from '../utils/logger'

export function errorHandler(err: any, req: Request, res: Response) {
  logError(`Error processing request ${req.method} ${req.originalUrl} - ${err && err.message ? err.message : ''}`)
  if (err && err.stack) {
    console.error(err.stack)
  } else {
    console.error(err)
  }

  const status = err.status || 500
  res.status(status).json({ message: err.message || 'Internal Server Error' })
}
