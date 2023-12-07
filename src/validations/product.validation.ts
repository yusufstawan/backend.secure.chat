import Joi from 'joi'
import type ProductType from '../types/product.type'

export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().allow('', null),
    size: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}

export const updateProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    name: Joi.string().allow('', null),
    price: Joi.number().allow('', null),
    size: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Create Product:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The product title
 *         price:
 *           type: number
 *           description: The product price
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
