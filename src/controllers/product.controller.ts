import { type Request, type Response } from 'express'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import {
  addProductToDB,
  deleteProductByIdFromDB,
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
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
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
    const products: any = await getProductFromDB(req.body.page, req.body.limit)
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
    logger.error('ERR = product - update', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }

  try {
    const result = await updateProductByIdFromDB(id, value)
    if (result) {
      logger.info('Update product successful')
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: 'Update product successful'
      })
    } else {
      logger.info('Data not found')
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'Data not found'
      })
    }
  } catch (error) {
    logger.error('ERR = product - update', error)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const result = await deleteProductByIdFromDB(id)

    if (result) {
      logger.info('Delete product successful')
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: 'Delete product successful'
      })
    } else {
      logger.info('Data not found')
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'Data not found'
      })
    }
  } catch (error) {
    logger.error('ERR = product - delete', error)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    })
  }
}
