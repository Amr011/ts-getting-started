import { IRoleCreateReqBody } from '../types/IRole'
import * as Joi from 'joi'

export const VRoleCreateReqBody: Joi.ObjectSchema<IRoleCreateReqBody> =
   Joi.object({
      title: Joi.string().required(),
   })
