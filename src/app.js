import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import routes from '../routes/weather_routes.js'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

const openapiOptions = {
  mode: 'static',
  routePrefix: `${process.env.BASE_ROUTE}/openapi`,
  specification: {
    path: './docs/openapi.yaml'
  },
  exposeRoute: true
}

const build = (options = {}) => {
  const app = Fastify(options)
  app.register(swagger, openapiOptions)
  routes(app, { prefix: process.env.BASE_ROUTE })

  return app
}

export default build
