import { type Request, type Response } from 'express'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import {
  addProductToDB,
  getProductByIdFromDB,
  getProductFromDB,
  updateProductByIdFromDB
} from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4()
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('ERR = product - create', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }
  try {
    await addProductToDB(value)
    logger.info('Add product successful')
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'Add product successful'
    })
  } catch (error) {
    logger.error('ERR = product - create', error)
    return res.status(500).send({
      status: false,
      statusCode: 500,
      message: 'Internal server error'
    })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  if (id) {
    const product: any = await getProductByIdFromDB(id)
    if (product) {
      logger.info('Success get product data by id')
      return res.status(200).send({
        status: true,
        statusCode: 200,
        data: product
      })
    } else {
      logger.info('Data not found')
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'Data not found',
        data: {}
      })
    }
  } else {
    const products: any = await getProductFromDB()
    logger.info('Success get product data')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: products
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = updateProductValidation(req.body)
  if (error) {
    logger.error('ERR = product - create', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }

  try {
    await updateProductByIdFromDB(id, value)
    logger.info('Update product successful')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Update product successful'
    })
  } catch (error) {}
}
