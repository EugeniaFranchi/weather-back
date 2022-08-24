import Fastify from 'fastify'
import { getBaseEndpoint } from '../controllers/weather_controller.js'

const baseRoute = '/v1'

const build = (options = {}) => {
  const app = Fastify(options)

  app.get(baseRoute, getBaseEndpoint)

  return app
}

export default build
