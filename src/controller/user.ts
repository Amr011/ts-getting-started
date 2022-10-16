import { user } from '../entity/user'
import { Request, Response, NextFunction } from 'express'
import { IUserRegisterReqBody, IUserUpdateReqBody } from '../types/IUser'
import { VUserRegisterReqBody, VUserUpdateReqBody } from '../validation/VUser'
import { hash } from 'bcryptjs'
import { userRole } from '../entity/userRole'

// Controller Layer
export default class userController {
   // get many users data controller function
   public async getManyUser(_req: Request, res: Response, _next: NextFunction) {
      const userData: user[] = await user.find({
         relations: ['role'],
      })

      if (userData) {
         return res.status(200).json(userData)
      } else {
         return res.status(200).json(false)
      }
   }

   // get one user data controller function
   public async getOneUser(req: Request, res: Response, _next: NextFunction) {
      const ID = req.params.id
      const userData: user | undefined = await user.findOne({
         where: { id: parseInt(ID) },
         relations: ['role', 'product'],
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
      if (!data) return res.status(400).json(false)

      const { error }: any = VUserRegisterReqBody.validate(data)
      if (error) return res.status(400).json({ err: error.details[0].message }) // error.details[0].message

      let existedUser = await user.findOne({
         where: { email: data.email },
         select: ['email'],
      })
      if (existedUser) return res.status(200).json(false)

      data.password = await hash(data.password, 12)

      await user.create(data).save()

      return res.status(200).json(true)
   }

   // Update existing user data controller function
   public async updateOneUser(
      req: Request,
      res: Response,
      _next: NextFunction
   ) {
      const ID = req.params
      const data: IUserUpdateReqBody = req.body
      if (!data || !ID) return res.status(400).json(false)

      const { error }: any = VUserUpdateReqBody.validate(data)
      if (error) return res.status(400).json({ err: error.details[0].message })

      let existedUser = await user.findOne({
         where: { email: data.email },
         select: ['email'],
      })
      if (!existedUser) return res.status(200).json(false)

      await user.update(ID, {
         firstname: data.firstname,
         lastname: data.lastname,
      })

      return res.status(200).json(true)
   }
   // Delete exisitng user data controller function
   public async deleteOneUser(
      req: Request,
      res: Response,
      _next: NextFunction
   ) {
      return res.status(200).json(true)
   }
}
