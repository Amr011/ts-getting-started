import express, { Router } from 'express'
const router: Router = express.Router()

import userService from '../../controller/user'

const user: userService = new userService()

// Get Current User GET Method
// router.route('/me').get()
// Get Many User GET Method
router.route('/').get(user.getManyUser)
// Get One User GET Method
router.route('/:id').get(user.getOneUser)
// Update Current User PUT Method
// router.route('/').put(user.updateOneUser)
// DELETE Current User DELETE Method
// router.route('/').delete(user.deleteOneUser)
// Change User Password POST Method
// router.route('/password')
// Forget User Password POST Method
// router.route('/password')

// Register User POST Method
router.route('/register').post(user.registerUser)
// Login User POST Method
// router.route('/login').post(user.loginUser)
// logout User POST Method
// router.route('/logout')
// Verify User GET Method
// router.route('/verify/:token').get(user.verifyUser)

export default router
