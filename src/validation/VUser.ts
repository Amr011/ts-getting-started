import { IUserRegisterReqBody } from '../types/IUser'
import * as Joi from 'joi'

export const VUserRegisterReqBody: Joi.ObjectSchema<IUserRegisterReqBody> =
   Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
   })
