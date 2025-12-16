import './model/index';
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import corsConfig from './config/corsConfig'
import userRouter from './routes/userRouter'
import authRouter from './routes/authRouter'
import { logServer, logSuccess, logError, logInfo } from './utils/logger'
import sequelize from './config/database'
import { errorHandler } from './middleware/errorHandler'
import storeRouter from './routes/storeRouter'

const app = express()
dotenv.config()
const port = process.env.PORT || 3000

app.use(cors(corsConfig))
app.use(express.json())
app.use((req, _res, next) => {
  logInfo(`${req.method} ${req.originalUrl}`)
  next()
})

app.use('/api/users', userRouter)
app.use('/api/stores', storeRouter)
app.use('/auth', authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use(errorHandler)

sequelize
  .authenticate()
  .then(() => {
    logSuccess('✅ Database connection established')
    app.listen(port, () => {
      logServer(`🚀 Server running on port ${port}`)
    })
  })
  .catch((err: any) => {
    logError('❌ Unable to connect to the database: ' + (err && err.message ? err.message : err))
    console.error(err)
    process.exit(1)
  })
