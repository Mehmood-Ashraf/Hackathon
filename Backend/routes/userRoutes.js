import express from 'express'
import { verifyAdmin } from '../middlewares/verifyAdmin.js'
import { getAllUsers } from '../controllers/admin.controllers.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { getMe } from '../controllers/users.controllers.js'

const router = express.Router()

router.get('/all', verifyAdmin, getAllUsers)
router.get('/me', verifyToken, getMe)

export default router