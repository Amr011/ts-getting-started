import { user } from '../entity/user'
import { Request, Response, NextFunction } from 'express'
import { IUserRegisterReqBody } from '../types/IUser'
import { VUserRegisterReqBody } from '../validation/VUser'
import { responsePattern } from '../utils/resPattern'
import { userRole } from '../entity/userRole'
import { hash } from 'bcryptjs'

// User Controller Layer
export default class userController {
   // get many users data controller function
   public async getManyUser(req: Request, res: Response, _next: NextFunction) {
      const data = await user.find({
         relations: ['roleConnection', 'roleConnection.role'],
      })

      if (data.length > 0) {
         return res.status(200).json(data)
      } else {
         return res.status(200).json(false)
      }
   }

   // get one user data controller function
   public async getOneUser(req: Request, res: Response, _next: NextFunction) {
      const ID = req.params.id
      const userData: user | undefined = await user.findOne({
         where: { id: parseInt(ID) },
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

      data.password = await hash(data.password, 12)

      await user.create(data).save()
      return res.status(200).json(true)
   }

   // create new users role m2m data controller function
   public async createUserRole(
      req: Request,
      res: Response,
      _next: NextFunction
   ) {
      const { userId, roleId } = req.body

      await userRole
         .create({
            userId: userId,
            roleId: roleId,
         })
         .save()
      return res.status(200).json(true)
   }
   // get many user-role m2m data controller function
   public async getManyUserRole(
      _req: Request,
      res: Response,
      _next: NextFunction
   ) {
      const data = await userRole.find({
         relations: ['user', 'role'],
      })
      if (data.length > 0) {
         return res.status(200).json(data)
      } else {
         return res.status(200).json(false)
      }
   }
   // get one user-role m2m data controller function
   public async getOneUserRole(
      req: Request,
      res: Response,
      _next: NextFunction
   ) {
      const ID = req.params.id
      const data = await userRole.find({
         where: { id: parseInt(ID) },
         relations: ['user', 'role'],
      })
      if (data.length > 0) {
         return res.status(200).json(data)
      } else {
         return res.status(200).json(false)
      }
   }
}
