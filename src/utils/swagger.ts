import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { type Application } from 'express'

const swaggerDocumentation = (app: Application) => {
  const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
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
    apis: ['src/routes/*.ts', 'src/validations/*.ts']
  }

  const specs = swaggerJSDoc(options)

  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-feeling-blue.css'
    })
  )
}

export default swaggerDocumentation
