import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

class Weather {
  constructor () {
    this.ip_api = process.env.WEATHER_URL
  }

  async getCurrentWeather (city) {
    return await this.getWeather ('weather', city)
  }

  async getForecast (city) {
    return await this.getWeather ('forecast', city)
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
}

export default Weather
