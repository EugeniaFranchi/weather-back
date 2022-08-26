import fetch from 'node-fetch'
import dotenv from 'dotenv'
import LocationParser from './location_parser.js'
dotenv.config({ path: './.env' })

class Locator {
  constructor () {
    this.ip_api = process.env.IP_API_URL
    this.parser = new LocationParser()
  }

  async getLocation (ip) {
    const url = `${this.ip_api}/${ip}`
    const data = await fetch(url).then((response) => { return response.json() })
    return this.parser.parseLocation(data)
  }

  async getCurrentCity (ip, city = '') {
    return city || (await this.getLocation(ip)).city
  }
}

export default Locator
