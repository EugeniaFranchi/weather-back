import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

const SUCCESS_CODE = '200'

class WeatherParser {
  parseCurrent (city, current) {
    if (current.cod.toString() !== SUCCESS_CODE) { return { city, current } }

    const cityInfo = {
      id: current.id,
      name: current.name,
      country: current.sys.country,
      coord: current.coord,
      timezone: current.timezone
    }

    delete current.id
    delete current.name
    delete current.coord
    delete current.timezone
    delete current.sys.country

    return { city: cityInfo, current }
  }

  parseForecast (city, forecast) {
    if (forecast.cod.toString() !== SUCCESS_CODE) { return { city, forecast } }

    const cityInfo = {
      id: forecast.city.id,
      name: forecast.city.name,
      country: forecast.city.country,
      coord: forecast.city.coord,
      timezone: forecast.city.timezone
    }

    delete forecast.city.id
    delete forecast.city.name
    delete forecast.city.coord
    delete forecast.city.timezone
    delete forecast.city.country

    return { city: cityInfo, forecast }
  }
}

export default WeatherParser
