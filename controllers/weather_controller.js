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
  let clientIp = req.socket.remoteAddress
  if (ip.isPrivate(clientIp)) {
    clientIp = await extIP().get().then(ip => { return ip })
  }
  const body = await locator.getLocation(clientIp)
  if (body.status === 'fail') { res.status(500) }
  res.send(body)
}

const getCurrent = async (req, res, next) => {
  let clientIp = req.socket.remoteAddress
  if (ip.isPrivate(clientIp)) {
    clientIp = await extIP().get().then(ip => { return ip })
  }
  const clientCity = req.params.city
  const city = await locator.getCurrentCity(clientIp, clientCity)
  const current = await weather.getCurrentWeather(city)
  const body = { city, current }
  res.send(body)
}

export {
  getBaseEndpoint,
  getLocation,
  getCurrent
}
