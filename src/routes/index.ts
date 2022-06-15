import express, { Router } from 'express'
const router: Router = express.Router()

import userRouter from './admin/user'
import roleRouter from './admin/role'

router.use('/user', userRouter)
router.use('/role', roleRouter)

export default router
