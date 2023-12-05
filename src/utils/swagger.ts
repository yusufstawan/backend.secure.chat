import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { type Application } from 'express'

const swaggerDocumentation = (app: Application) => {
  const options = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'Backend Secure Chat API',
        version: '0.1.0',
        description: 'Backend Secure Chat API Documentation',
        contact: {
          name: 'yusufstawan',
          url: 'https://yusufstawan.com/'
        }
      },
      servers: [
        {
          url: 'http://localhost:4000'
        }
      ]
    },
    apis: ['../routes/*.ts']
  }

  const specs = swaggerJsdoc(options)

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))
}

export default swaggerDocumentation
