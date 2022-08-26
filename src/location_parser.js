import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

class LocationParser {
  parseLocation (location) {
    delete location.isp
    delete location.org
    delete location.as
    delete location.query

    return location
  }
}

export default LocationParser
