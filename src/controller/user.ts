import { user } from '../entity/user'
import { Request, Response, NextFunction } from 'express'
import { IUserRegisterReqBody } from '../types/IUser'
import { VUserRegisterReqBody } from '../validation/VUser'
import { responsePattern } from '../utils/resPattern'

// User Controller Layer
export default class userController {
   // get many users data controller function
   public async getManyUser(req: Request, res: Response, _next: NextFunction) {
      const userData: user[] = await user.find({
         relations: ['role'],
      })

      const httpMethod = req.method.toLowerCase()

      if (userData.length > 0) {
         return res
            .status(200)
            .json(responsePattern('user', httpMethod, true, 200, userData))
      } else {
         return res
            .status(200)
            .json(responsePattern('user', httpMethod, false, 200, userData))
      }
   }

   // get one user data controller function
   public async getOneUser(req: Request, res: Response, _next: NextFunction) {
      const ID = req.params.id
      const userData: user | undefined = await user.findOne({
         where: { id: parseInt(ID) },
         relations: ['role'],
      })
      if (userData) {
         return res.status(200).json(userData)
      } else {
         return res.status(200).json(null)
      }
   }

   // register new users data controller function
   public async registerUser(req: Request, res: Response, _next: NextFunction) {
      const data: IUserRegisterReqBody = req.body
      const { error }: any = VUserRegisterReqBody.validate(data)
      if (error) return res.status(400).json({ err: error.details[0].message }) // error.details[0].message

      await user.create(data).save()
      return res.status(200).json(true)
   }
}
