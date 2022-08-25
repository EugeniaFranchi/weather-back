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
})
