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

    const current = await locator.getForecast(city)

    expect(current).toHaveProperty('list')
    expect(current.list[0]).toHaveProperty('weather')
    expect(current.list[0]).toHaveProperty('main')
    expect(current.list[0]).toHaveProperty('visibility')
    expect(current.list[0]).toHaveProperty('wind')
    expect(current.list[0]).toHaveProperty('clouds')
  })
})
