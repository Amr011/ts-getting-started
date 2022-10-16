import express, { Application, Request, Response, NextFunction } from 'express'

import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

import path from 'path'
import favicon from 'serve-favicon'

import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import connectDatabase from './config/db.config'
import router from './routes/index'
import errorHandler from './middleware/error-handler'

import { role } from './entity/role'

// Main Function
async function ServerLancher(): Promise<void> {
   try {
      const app: Application = express()

      // Setup middlewares
      app.use(cookieParser())
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(morgan('dev'))
      app.use(cors())

      // Error Handling
      app.use(errorHandler)

      // Favicon Config -- Not Loading
      app.use(favicon(path.join(__dirname, 'public', 'icons', 'favicon.ico')))

      // Router Config
      app.use('/api/v1', router)

      // Unavailable Request
      app.use((_req: Request, res: Response, _next: NextFunction) => {
         res.status(404).json({
            success: false,
            status: res.statusCode,
            message: 'Unavailable Request',
         })
         res.end()
      })

      // Env Files Config
      dotenv.config()

      //   Database Connection
      await connectDatabase()
         .then(() => {
            role.create({ title: 'USER' }).save()
            role.create({ title: 'ADMIN' }).save()
            role.create({ title: 'MODERATOR' }).save()
            console.log('Database connected successfully !')
         })
         .catch((err: any) => console.log(err))

      // Server Listen
      type PORT = number | string
      const port: PORT = process.env.PORT || 2022
      app.listen(port, () => {
         console.log(`Server is running on port ${port}`)
      })
   } catch (error) {
      console.log(error)
   }
}
ServerLancher()
