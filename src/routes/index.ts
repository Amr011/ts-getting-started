import express, { Router } from 'express'
const router: Router = express.Router()

import userRouter from './admin/user'
import roleRouter from './admin/role'
import userRoleRouter from './admin/userRole'

router.use('/user', userRouter)
router.use('/role', roleRouter)
router.use('/userRole', userRoleRouter)

export default router
