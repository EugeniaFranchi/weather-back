import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

const SUCCESS_CODE = 200

class Weather {
  constructor () {
    this.ip_api = process.env.WEATHER_URL
    this.endpoint_current = 'weather'
    this.endpoint_forecast = 'forecast'
  }

  async getCurrentWeather (city) {
    const current = await this.getWeather(this.endpoint_current, city)
    return this.parseCurrent(city, current)
  }

  async getForecast (city) {
    return await this.getWeather(this.endpoint_forecast, city)
  }

  async getWeather (endpoint, city) {
    const params = new URLSearchParams({
      q: city,
      appid: process.env.WEATHER_API_KEY
    })
    const url = `${this.ip_api}/${endpoint}?` + params

    const data = await fetch(url)
      .then((response) => { return response.json() })
    return data
  }

  parseCurrent (city, current) {
    if (current.cod !== SUCCESS_CODE) { return { city, current } }

    const cityInfo = {
      id: current.id,
      name: current.name,
      coord: current.coord,
      country: current.sys.country,
      timezone: current.timezone
    }

    delete current.id
    delete current.name
    delete current.coord
    delete current.sys.country
    delete current.timezone

    return { city: cityInfo, current }
  }
}

export default Weather
