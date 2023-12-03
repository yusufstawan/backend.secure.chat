import { Router, type Request, type Response, type NextFunction } from 'express'
import { logger } from '../utils/logger'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Get product successful')
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: [
      {
        name: 'Sepatu Sport',
        price: 200000
      }
    ]
  })
})

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Post product successful')
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: req.body
  })
})
