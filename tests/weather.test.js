import Weather from '../src/weather'

describe('Weather', () => {
  test('gets current weather of Viedma', async () => {
    const locator = new Weather()
    const city = 'Viedma'

    const current = await locator.getCurrentWeather(city)

    expect(current).toHaveProperty('weather')
    expect(current).toHaveProperty('main')
    expect(current).toHaveProperty('visibility')
    expect(current).toHaveProperty('wind')
    expect(current).toHaveProperty('clouds')
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
