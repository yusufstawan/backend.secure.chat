import { logger } from '../utils/logger'
import productModel from '../models/product.model'
import type ProductType from '../types/product.type'

export const addProductToDB = async (payload: ProductType) => {
  return await productModel
    .create(payload)
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.error('ERR = product - create', err)
    })
}

export const getProductFromDB = async () => {
  return await productModel
    .find()
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.error('ERR = product - get', err)
    })
}

export const getProductByIdFromDB = async (id: string) => {
  return await productModel
    .findOne({ product_id: id })
    .then((data) => {
      return data
    })
    .catch((err) => {
      logger.error('ERR = product - get', err)
    })
}

export const updateProductByIdFromDB = async (id: string, payload: ProductType) => {
  const result = await productModel.findOneAndUpdate({ product_id: id }, { $set: payload })
  return result
}

export const deleteProductByIdFromDB = async (id: string) => {
  const result = await productModel.findOneAndDelete({ product_id: id })
  return result
}
