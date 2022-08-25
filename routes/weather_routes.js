import {
  getBaseEndpoint,
  getLocation,
  getCurrent,
  getForecast
} from '../controllers/weather_controller.js'

const routes = (app, options) => {
  app.register((instance, opts, next) => {
    instance.get('/', getBaseEndpoint)
    instance.get('/location', getLocation)
    instance.get('/current/:city', getCurrent)
    instance.get('/current', getCurrent)
    instance.get('/forecast/:city', getForecast)
    instance.get('/forecast', getForecast)

    next()
  }, options)
}

export default routes
