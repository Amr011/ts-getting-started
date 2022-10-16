import { NextFunction, Request, Response } from 'express-serve-static-core'
import { role } from '../entity/role'
import { userRole } from '../entity/userRole'

export default class roleController {
   // get many role data controller function
   public async getManyRole(req: Request, res: Response, next: NextFunction) {
      const data = await role.find({
         select: ['userConnection'],
      })
      return res.status(200).json(data)
   }
}
