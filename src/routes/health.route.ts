import { Router, type Request, type Response, type NextFunction } from 'express'
import { logger } from '../utils/logger'

export const HealthRouter: Router = Router()

HealthRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Health check successful')
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: 'Health check successful'
  })
})

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health check
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: The health check was successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               status:
 *                type: boolean
 *             statusCode:
 *               type: number
 *             data:
 *               type: string
 */
