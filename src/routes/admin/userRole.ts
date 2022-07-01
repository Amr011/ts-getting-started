import express, { Router } from 'express'
const router: Router = express.Router()
import userController from '../../controller/user'

const user: userController = new userController()

// User Role Get GET Method
router.route('/get').get(user.getManyUserRole)
// User Role Create POST Method
router.route('/post').post(user.createUserRole)

export default router
