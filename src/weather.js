import fetch from 'node-fetch'
import dotenv from 'dotenv'
import WeatherParser from './weather_parser.js'
dotenv.config({ path: './.env' })

class Weather {
  constructor () {
    this.ip_api = process.env.WEATHER_URL
    this.endpoint_current = 'weather'
    this.endpoint_forecast = 'forecast'
    this.parser = new WeatherParser()
  }

  async getCurrentWeather (city) {
    const current = await this.getWeather(this.endpoint_current, city)
    return this.parser.parseCurrent(city, current)
  }

  async getForecast (city) {
    const forecast = await this.getWeather(this.endpoint_forecast, city)
    return this.parser.parseForecast(city, forecast)
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
