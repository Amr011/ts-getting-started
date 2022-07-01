import { IRes, IResStatus } from '../types/IRes'

export async function responsePattern(
   def: string,
   opp: string,
   success: boolean,
   status: IResStatus,
   data?: any
): Promise<IRes> {
   const response: IRes = {
      success,
      status: status,
      message: success
         ? `${def} ${opp} successfully`
         : `failed to ${opp} ${def} `,
      data,
   }
   if (!data || !success) {
      delete response['data']
   }

   return response
}
