import { type Application, type Router } from 'express'
import { HealthRouter } from './health.route'
import { ProductRouter } from './product.route'
import { AuthRouter } from './auth.route'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/product', ProductRouter],
  ['/auth', AuthRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
