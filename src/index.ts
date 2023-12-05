import createServer from './utils/server'
import { logger } from './utils/logger'
import swaggerDocumentation from './utils/swagger'

// connect to database MongoDB
import './utils/connectDB'

const app = createServer()
const port: number = 4000

swaggerDocumentation(app)

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})
