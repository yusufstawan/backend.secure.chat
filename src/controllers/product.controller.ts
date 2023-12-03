import { type Request, type Response } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import { getProductFromDB } from '../services/product.service'

interface ProductType {
  product_id: string
  name: string
  price: number
  size: string
}

export const createProduct = (req: Request, res: Response) => {
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('ERR = product - create', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }
  logger.info('Add product successful')
  return res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'Add product successful',
    data: value
  })
}

export const getProduct = async (req: Request, res: Response) => {
  const products: any = await getProductFromDB()

  const {
    params: { name }
  } = req

  if (name) {
    const filterProduct = products.filter((product: ProductType) => product.name === name)
    if (filterProduct.length === 0) {
      logger.error('ERR = product - get', 'Product not found')
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'Product not found'
      })
    }
    logger.info('Success get product successful')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: filterProduct[0]
    })
  }

  logger.info('Success get product successful')
  return res.status(200).send({
    status: true,
    statusCode: 200,
    data: products
  })
}
