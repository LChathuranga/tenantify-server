import { Router } from 'express'
import jwtValidator from '../middleware/jwtValidator'
import { requireAuth, requireRole } from '../middleware/auth'
import { getUserById, getUserProfile } from '../controllers/userCotroller'

const router = Router()

router.get('/profile', jwtValidator, requireAuth, getUserProfile)
router.get('/:id', jwtValidator, requireAuth, getUserById)

router.get('/super-admin', jwtValidator, requireAuth, requireRole('ADMIN'), (req, res) => {
  res.json({ message: 'admin only route' })
})

export default router
