import express, { Router } from 'express'
const router: Router = express.Router()

import roleController from '../../controller/role'

const role: roleController = new roleController()

// Get Many Role HTTP GET
router.route('/').get(role.getManyRole)
// Create One Role HTTP POST
router.route('/').post(role.createRole)

export default router
