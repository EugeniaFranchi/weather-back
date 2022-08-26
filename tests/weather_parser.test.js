import WeatherParser from '../src/weather_parser'

describe('WeatherParser', () => {
  test('parses current correctly', async () => {
    const parser = new WeatherParser()
    const cityName = 'Viedma'
    const weather = {
      coord: { lon: -62.9967, lat: -40.8135 },
      weather: [{ main: 'Clouds' }],
      base: 'stations',
      main: { temp: 291.41, pressure: 1006, humidity: 19 },
      visibility: 10000,
      wind: { speed: 9.26 },
      clouds: { all: 100 },
      dt: 1661536225,
      sys: { country: 'AR' },
      timezone: -10800,
      id: 3832899,
      name: 'Viedma',
      cod: 200
    }

    const current = parser.parseCurrent(cityName, weather)

    expect(current).toHaveProperty('city')
    expect(current.city).toHaveProperty('name')
    expect(current.city).toHaveProperty('country')
    expect(current.city).toHaveProperty('coord')
    expect(current).toHaveProperty('current')
    expect(current.current).toHaveProperty('weather')
    expect(current.current).toHaveProperty('main')
    expect(current.current).toHaveProperty('wind')
  })

  test('parses forecast correctly', async () => {
    const parser = new WeatherParser()
    const cityName = 'Viedma'
    const weather = {
      cod: '200',
      list: [{
        main: { temp: 291.41, pressure: 1006, humidity: 19 },
        weather: [{ main: 'Clouds' }],
        clouds: { all: 100 },
        wind: { speed: 9.26 },
        visibility: 10000,
        dt_txt: '2022-08-26 18:00:00'
      }
      ],
      city: {
        id: 3832899,
        name: 'Viedma',
        coord: { lat: -40.8135, lon: -62.9967 },
        country: 'AR',
        population: 48940,
        timezone: -10800
      }
    }

    const forecast = parser.parseForecast(cityName, weather)

    expect(forecast).toHaveProperty('city')
    expect(forecast.city).toHaveProperty('name')
    expect(forecast.city).toHaveProperty('country')
    expect(forecast.city).toHaveProperty('coord')
    expect(forecast).toHaveProperty('forecast')
    expect(forecast.forecast).toHaveProperty('list')
    expect(forecast.forecast.list[0]).toHaveProperty('weather')
    expect(forecast.forecast.list[0]).toHaveProperty('main')
    expect(forecast.forecast.list[0]).toHaveProperty('visibility')
    expect(forecast.forecast.list[0]).toHaveProperty('wind')
    expect(forecast.forecast.list[0]).toHaveProperty('clouds')
  })
})
