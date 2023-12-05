import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import createServer from '../utils/server'

const app = createServer()

describe('product', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('get detail products', () => {
    describe('give the product does not exist', () => {
      it('should return 404, and empty array', async () => {
        const productId = 'Product_123'
        await supertest(app).get(`/products/${productId}`).expect(404)
      })
    })
  })
})
