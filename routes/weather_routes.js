import {
  getBaseEndpoint,
  getLocation
} from '../controllers/weather_controller.js'

const routes = (app, options) => {
  app.register((instance, opts, next) => {
    instance.get('/', getBaseEndpoint)
    instance.get('/location', getLocation)

    next()
  }, options)
}

export default routes
