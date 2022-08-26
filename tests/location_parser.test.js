import LocationParser from '../src/location_parser'

describe('LocationParser', () => {
  test('parses location correctly', async () => {
    const parser = new LocationParser()
    const response = {
      status: 'success',
      country: 'Argentina',
      countryCode: 'AR',
      region: 'B',
      regionName: 'Buenos Aires',
      city: 'Florida',
      zip: '1636',
      lat: -30.0000,
      lon: -50.0000,
      timezone: 'America/Argentina/Buenos_Aires',
      isp: 'ISP S.A.',
      org: 'Organizacion S.A',
      as: 'AS123 S.A.',
      query: '127.0.0.1'
    }

    const location = parser.parseLocation(response)

    expect(location).not.toHaveProperty('isp')
    expect(location).not.toHaveProperty('org')
    expect(location).not.toHaveProperty('as')
    expect(location).not.toHaveProperty('query')
    expect(location).toHaveProperty('city')
    expect(location).toHaveProperty('country')
    expect(location).toHaveProperty('regionName')
    expect(location).toHaveProperty('countryCode')
  })
})
