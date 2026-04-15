//← register / login

import { Router } from 'express'
import { register, login, getProfile } from '../controllers/auth.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', authMiddleware, getProfile)  // ต้อง login ก่อน

export default router