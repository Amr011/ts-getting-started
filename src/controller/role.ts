import { role } from '../entity/role'
import { Request, Response, NextFunction } from 'express'
import { IRoleCreateReqBody } from '../types/IRole'
import { VRoleCreateReqBody } from '../validation/VRole'

// Role Controller Layer
export default class roleController {
   // get many role data controller function
   public async getManyRole(_req: Request, res: Response, _next: NextFunction) {
      const roleData: role[] = await role.find({})

      if (roleData) {
         return res.status(200).json(roleData)
      } else {
         return res.status(200).json(null)
      }
   }
   // get many role data controller function
   public async getOneRole(req: Request, res: Response, _next: NextFunction) {
      const ID = req.params.id
      const roleData: role | undefined = await role.findOne({
         where: { id: parseInt(ID) },
      })

      if (roleData) {
         return res.status(200).json(roleData)
      } else {
         return res.status(200).json(null)
      }
   }

   // create new role data controller function
   public async createRole(req: Request, res: Response, _next: NextFunction) {
      const data: IRoleCreateReqBody = req.body
      const { error }: any = VRoleCreateReqBody.validate(data)
      if (error) return res.status(400).json({ err: error.details[0].message }) // error.details[0].message

      await role.create(data).save()
      return res.status(200).json(true)
   }
}
