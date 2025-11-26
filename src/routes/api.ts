import { Router } from 'express'
import jwtValidator from '../middleware/jwtValidator'
import { requireAuth, requireRole } from '../middleware/auth'

const router = Router()

router.get('/public', (req, res) => {
  res.json({ message: 'public API - no auth' })
})

router.use('/', jwtValidator, requireAuth, (req, res) => {
  res.json({ message: 'private API - authenticated', user: (req as any).user })
})

router.get('/super-admin', jwtValidator, requireAuth, requireRole('ADMIN'), (req, res) => {
  res.json({ message: 'admin only route' })
})

export default router
