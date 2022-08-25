import Locator from '../src/locator.js'
import extIP from 'ext-ip'

const locator = new Locator()

const getBaseEndpoint = async (req, res, next) => {
  return { status: 'up' }
}

const getLocation = async (req, res, next) => {
  let clientIp = req.socket.remoteAddress
  clientIp = await extIP().get().then(ip => { return ip })
  const body = await locator.getLocation(clientIp)
  res.send(body)
}

export {
  getBaseEndpoint,
  getLocation
}
