export type IResStatus = 100 | 200 | 300 | 400 | 500

export interface IRes {
   success: boolean
   status: IResStatus
   message: string
   data?: any
}
