import {
  getBaseEndpoint
} from '../controllers/weather_controller.js'

const routes = (app, options) => {
  app.register((instance, opts, next) => {
    instance.get('/', getBaseEndpoint)

    next()
  }, options)
}

export default routes
