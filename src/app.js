import Fastify from 'fastify'
import { getBaseEndpoint } from '../controllers/weather_controller.js'
import swagger from '@fastify/swagger'

const baseRoute = '/v1'
const openapiOptions = {
  mode: 'static',
  routePrefix: `${baseRoute}/openapi`,
  specification: {
    path: './docs/openapi.yaml'
  },
  exposeRoute: true
}

const build = (options = {}) => {
  const app = Fastify(options)
  app.register(swagger, openapiOptions)

  app.get(baseRoute, getBaseEndpoint)

  return app
}

export default build
