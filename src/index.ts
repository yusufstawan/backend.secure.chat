import createServer from './utils/server'
import { logger } from './utils/logger'

// connect to database MongoDB
import './utils/connectDB'

const app = createServer()
const port: number = 4000

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})
