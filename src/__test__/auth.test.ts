import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import createServer from '../utils/server'
import { v4 as uuidv4 } from 'uuid'
import { createUser } from '../services/auth.service'
import { hasing } from '../utils/hasing'

const app = createServer()

const userAdmin = {
  user_id: uuidv4(),
  email: 'test@gmail.com',
  name: 'Unit Test Admin',
  password: `${hasing('12345')}`,
  role: 'admin'
}

const userRegular = {
  user_id: uuidv4(),
  email: 'test123@gmail.com',
  name: 'Unit Test Regular',
  password: `${hasing('12345')}`,
  role: 'regular'
}

const userAdminCreated = {
  email: 'test12xxx@gmail.com',
  name: 'Unit Test Admin',
  password: '12345',
  role: 'admin'
}

const userRegularCreated = {
  email: 'test123123@gmail.com',
  name: 'Unit Test Regular',
  password: '12345'
}

const userAdminLogin = {
  email: 'test@gmail.com',
  password: '12345'
}

const userNotExist = {
  email: 'test123ss@gmail.com',
  password: '12345'
}

describe('auth', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
    await createUser(userAdmin)
    await createUser(userRegular)
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('register', () => {
    describe('create user with role admin', () => {
      it('should return 201, success create user', async () => {
        await supertest(app).post('/auth/register').send(userAdminCreated).expect(201)
      })
    })
    describe('create user with role regular', () => {
      it('should return 201, success create user', async () => {
        await supertest(app).post('/auth/register').send(userRegularCreated).expect(201)
      })
    })
  })

  describe('login', () => {
    describe('login with exist user', () => {
      it('should return 200, return access token & refresh token', async () => {
        await supertest(app).post('/auth/login').send(userAdminLogin).expect(200)
      })
    })
    describe('login with not exist user', () => {
      it('should return 422, login failed', async () => {
        await supertest(app).post('/auth/register').send(userNotExist).expect(422)
      })
    })
  })
})
