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
  const clientIp = await getIp(req)
  const clientCity = req.params.city
  const city = await locator.getCurrentCity(clientIp, clientCity)
  const current = await weather.getCurrentWeather(city)
  if (current.cod === '404') { res.status(500) }
  const body = { city, current }
  res.send(body)
}

const getForecast = async (req, res, next) => {
  const clientIp = await getIp(req)
  const clientCity = req.params.city
  const city = await locator.getCurrentCity(clientIp, clientCity)
  const forecast = await weather.getForecast(city)
  const body = { city, forecast }
  res.send(body)
}

const getIp = async (req) => {
  let clientIp = req.socket.remoteAddress
  if (ip.isPrivate(clientIp)) {
    clientIp = await extIP().get().then(ip => { return ip })
  }
  return clientIp
}

export {
  getBaseEndpoint,
  getLocation,
  getCurrent,
  getForecast
}
