import { IRes } from '../types/IResPattern'

export function responsePattern(
   def: string,
   opp: string,
   success: boolean,
   status: number,
   data?: any
): IRes {
   const response: IRes = {
      success,
      status: status,
      message: success
         ? `${def} ${opp} successfully`
         : `faild to ${opp} ${def} data`,
      data,
   }
   if (!data || !success) {
      delete response.data
   }

   return response
}

//   const { def, opp, resCode, resData } = {
//      def: 'user',
//      opp: req.method.toLowerCase(),
//      resCode: res.statusCode,
//      resData: data,
//   }
