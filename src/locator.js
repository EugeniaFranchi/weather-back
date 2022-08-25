import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

class Locator {
  constructor () {
    this.ip_api = process.env.IP_API_URL
  }

  async getLocation (ip) {
    const url = `${this.ip_api}/${ip}`
    const data = await fetch(url).then((response) => { return response.json() })
    return data
  }

  async getCurrentCity (ip, city) {
    return city
  }
}

export default Locator
