import { IdbConfig } from '../types/IdbConfig'

export const dbConfig: IdbConfig = {
   type: process.env.DB_TYPE,
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
}

export const __prod__ = process.env.NODE_ENV === 'production'
export const __dev__ = process.env.NODE_ENV === 'development'
