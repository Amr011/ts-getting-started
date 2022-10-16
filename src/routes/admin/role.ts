import express, { Router } from 'express'
const router: Router = express.Router()

import roleController from '../../controller/role'
const role: roleController = new roleController()

// Get Many Role GET Method
router.route('/').get(role.getManyRole)

export default router
