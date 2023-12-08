import { Router } from 'express'
import { registerUser, createSession, refreshSession } from '../controllers/auth.controller'

export const AuthRouter: Router = Router()

AuthRouter.post('/register', registerUser)
AuthRouter.post('/login', createSession)
AuthRouter.post('/refresh', refreshSession)

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth API
 * /auth/register:
 *  post:
 *   summary: Register user
 *   tags: [Auth]
 *  requestBody:
 *   required: true
 *  content:
 *      application/json:
 */
