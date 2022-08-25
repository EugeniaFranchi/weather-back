import Locator from '../src/locator'

describe('Locator', () => {
  test('gets the location Viedma, Rio Negro', async () => {
    const locator = new Locator()
    const ipViedma = '45.5.0.0'
    const expectedCity = 'Viedma'
    const expectedRegion = 'Rio Negro'
    const expectedCountry = 'Argentina'

    const location = await locator.getLocation(ipViedma)

    expect(location.city).toBe(expectedCity)
    expect(location.regionName).toBe(expectedRegion)
    expect(location.country).toBe(expectedCountry)
  })
})
