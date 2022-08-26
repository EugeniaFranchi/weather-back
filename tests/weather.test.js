import Weather from '../src/weather'

describe('Weather', () => {
  test('gets current weather of Viedma', async () => {
    const locator = new Weather()
    const city = 'Viedma'

    const current = await locator.getCurrentWeather(city)

    expect(current).toHaveProperty('city')
    expect(current.city).toHaveProperty('name')
    expect(current.city).toHaveProperty('country')
    expect(current.city).toHaveProperty('coord')
    expect(current).toHaveProperty('current')
    expect(current.current).toHaveProperty('weather')
    expect(current.current).toHaveProperty('main')
    expect(current.current).toHaveProperty('wind')
  })

  test('gets forecast of Viedma', async () => {
    const locator = new Weather()
    const city = 'Viedma'

    const forecast = await locator.getForecast(city)

    expect(forecast).toHaveProperty('list')
    expect(forecast.list[0]).toHaveProperty('weather')
    expect(forecast.list[0]).toHaveProperty('main')
    expect(forecast.list[0]).toHaveProperty('visibility')
    expect(forecast.list[0]).toHaveProperty('wind')
    expect(forecast.list[0]).toHaveProperty('clouds')
  })
})
