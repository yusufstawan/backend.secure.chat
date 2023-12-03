import mongoose from 'mongoose'
import CONFIG from '../config/environment'
import { logger } from './logger'

mongoose
  .connect(`${CONFIG.db}`)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((err) => {
    logger.error('Failed to connect to MongoDB', err)
    process.exit(1)
  })
