import Locator from '../src/locator.js'
import Weather from '../src/weather.js'
import ip from 'ip'
import extIP from 'ext-ip'

const locator = new Locator()
const weather = new Weather()

const getBaseEndpoint = async (req, res, next) => {
  return { status: 'up' }
}

const getLocation = async (req, res, next) => {
  const clientIp = await getIp(req)
  const body = await locator.getLocation(clientIp)
  if (body.status === 'fail') { res.status(500) }
  res.send(body)
}

const getCurrent = async (req, res, next) => {
  const city = await getCity(req)
  const current = await weather.getCurrentWeather(city)
  if (current.current.cod === '404') {
    res.status(500)
  }
  res.send(current)
}

const getForecast = async (req, res, next) => {
  const city = await getCity(req)
  const forecast = await weather.getForecast(city)
  if (forecast.forecast.cod === '404') { res.status(500) }
  res.send(forecast)
}

const getIp = async (req) => {
  let clientIp = req.socket.remoteAddress
  if (ip.isPrivate(clientIp)) {
    clientIp = await extIP().get().then(ip => { return ip })
  }
  return clientIp
}

const getCity = async (req) => {
  const clientIp = await getIp(req)
  const clientCity = req.params.city
  const city = await locator.getCurrentCity(clientIp, clientCity)
  return city
}

export {
  getBaseEndpoint,
  getLocation,
  getCurrent,
  getForecast
}
