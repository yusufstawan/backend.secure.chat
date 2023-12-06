import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import createServer from '../utils/server'
import { v4 as uuidv4 } from 'uuid'
import { addProductToDB } from '../services/product.service'
import { createUser } from '../services/auth.service'
import { hasing } from '../utils/hasing'

const app = createServer()

const productPayload = {
  product_id: uuidv4(),
  name: 'Product 1',
  price: 1000,
  size: 'XL'
}
const productPayloadCreate = {
  product_id: uuidv4(),
  name: 'Product 2',
  price: 2000,
  size: 'L'
}

const productPayloadUpdate = {
  price: 20000,
  size: 'XL'
}

const userAdminCreated = {
  user_id: uuidv4(),
  email: 'test@gmail.com',
  name: 'Unit Test Admin',
  password: `${hasing('12345')}`,
  role: 'admin'
}

const userAdmin = {
  email: 'test@gmail.com',
  password: '12345'
}

const userRegularCreated = {
  user_id: uuidv4(),
  email: 'test123@gmail.com',
  name: 'Unit Test Regular',
  password: `${hasing('12345')}`,
  role: 'regular'
}

const userRegular = {
  email: 'test123@gmail.com',
  password: '12345'
}

describe('product', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
    await addProductToDB(productPayload)
    await createUser(userAdminCreated)
    await createUser(userRegularCreated)
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('get all product', () => {
    describe('given the product does exist', () => {
      it('should return 200', async () => {
        const { statusCode } = await supertest(app).get('/product')
        expect(statusCode).toBe(200)
      })
    })
  })

  describe('get detail products', () => {
    describe('given the product does not exist', () => {
      it('should return 404, and empty data', async () => {
        const productId = 'PRODUCT_123'
        await supertest(app).get(`/product/${productId}`).expect(404)
      })
    })
    describe('given the product does exist', () => {
      it('should return 200, and detail product data', async () => {
        const { statusCode, body } = await supertest(app).get(`/product/${productPayload.product_id}`)
        expect(statusCode).toBe(200)
        expect(body.data.name).toBe('Product 1')
      })
    })
  })

  describe('create product', () => {
    describe('if use is not logged in', () => {
      it('should return 403, request forbidden', async () => {
        const { statusCode } = await supertest(app).post('/product').send(productPayloadCreate).expect(403)
        expect(statusCode).toBe(403)
      })
    })
    describe('if user is logged in as admin', () => {
      it('should return 201, success create product', async () => {
        const { body } = await supertest(app).post('/auth/login').send(userAdmin)
        await supertest(app)
          .post('/product')
          .set('Authorization', `Bearer ${body.data.accessToken}`)
          .send(productPayloadCreate)
          .expect(201)
      })
      it('should return 422, product name is already exist in db', async () => {
        const { body } = await supertest(app).post('/auth/login').send(userAdmin)
        await supertest(app)
          .post('/product')
          .set('Authorization', `Bearer ${body.data.accessToken}`)
          .send(productPayload)
          .expect(422)
      })
    })
    describe('if user is logged in as regular', () => {
      it('should return 403, request forbidden', async () => {
        const { body } = await supertest(app).post('/auth/login').send(userRegular)
        await supertest(app)
          .post('/product')
          .set('Authorization', `Bearer ${body.data.accessToken}`)
          .send(productPayloadCreate)
          .expect(403)
      })
    })
  })

  describe('update product', () => {
    describe('if use is not logged in', () => {
      it('should return 403, request forbidden', async () => {
        const { statusCode } = await supertest(app).put(`/product/${productPayload.product_id}`).expect(403)
        expect(statusCode).toBe(403)
      })
    })
    describe('if user is logged in as admin', () => {
      it('should return 200, success update product', async () => {
        const { body } = await supertest(app).post('/auth/login').send(userAdmin)
        await supertest(app)
          .put(`/product/${productPayload.product_id}`)
          .set('Authorization', `Bearer ${body.data.accessToken}`)
          .send(productPayloadUpdate)
          .expect(200)
      })
    })
    describe('if user is logged in as regular', () => {
      it('should return 403, request forbidden', async () => {
        const { body } = await supertest(app).post('/auth/login').send(userRegular)
        await supertest(app)
          .put(`/product/${productPayload.product_id}`)
          .set('Authorization', `Bearer ${body.data.accessToken}`)
          .send(productPayloadUpdate)
          .expect(403)
      })
    })
  })

  describe('delete product', () => {
    describe('if use is not logged in', () => {
      it('should return 403, request forbidden', async () => {
        const { statusCode } = await supertest(app).delete(`/product/${productPayload.product_id}`).expect(403)
        expect(statusCode).toBe(403)
      })
    })
    describe('if user is logged in as admin', () => {
      it('should return 200, success delete product', async () => {
        const { body } = await supertest(app).post('/auth/login').send(userAdmin)
        await supertest(app)
          .delete(`/product/${productPayload.product_id}`)
          .set('Authorization', `Bearer ${body.data.accessToken}`)
          .expect(200)
      })
    })
    describe('if user is logged in as regular', () => {
      it('should return 403, request forbidden', async () => {
        const { body } = await supertest(app).post('/auth/login').send(userRegular)
        await supertest(app)
          .delete(`/product/${productPayload.product_id}`)
          .set('Authorization', `Bearer ${body.data.accessToken}`)
          .expect(403)
      })
    })
  })
})
