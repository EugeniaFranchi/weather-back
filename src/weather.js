import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

class Weather {
  constructor () {
    this.ip_api = process.env.WEATHER_URL
  }

  async getCurrentWeather (city) {
    const params = new URLSearchParams({
      q: city,
      appid: process.env.WEATHER_API_KEY
    })
    const url = `${this.ip_api}/weather?` + params

    const data = await fetch(url)
      .then((response) => { return response.json() })
    return data
  }
}

export default Weather
