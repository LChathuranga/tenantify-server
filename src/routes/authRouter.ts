import { Router } from 'express'
import { loginHandler, signupHandler } from '../controllers/authController'
import { validateSignupBody, validateLoginBody } from '../middleware/validateBody'

const router = Router()

router.post('/signup', validateSignupBody, (req, res, next) => {
  signupHandler(req, res, next)
})

router.post('/login', validateLoginBody, (req, res, next) => {
  loginHandler(req, res, next)
})

export default router
