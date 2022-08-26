import build from '../src/app.js'
import ip from 'ip'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

describe('Base endpoint: /v1', () => {
  test('gets the base endpoint', async () => {
    const app = build()

    const response = await app.inject({
      method: 'GET',
      url: process.env.BASE_ROUTE
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body).status).toBe('up')
  })
})

describe('Location: /location', () => {
  test('gets the location', async () => {
    const app = build()

    const response = await app.inject({
      method: 'GET',
      url: `${process.env.BASE_ROUTE}/location`
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toHaveProperty('city')
    expect(JSON.parse(response.body)).toHaveProperty('country')
    expect(JSON.parse(response.body)).toHaveProperty('lat')
    expect(JSON.parse(response.body)).toHaveProperty('lon')
  })

  test('invalid location', async () => {
    const app = build()
    const spy = jest.spyOn(ip, 'isPrivate').mockImplementation(() => false)

    const response = await app.inject({
      method: 'GET',
      url: `${process.env.BASE_ROUTE}/location`
    })

    expect(response.statusCode).toBe(500)
    spy.mockRestore()
  })
})

describe('Current: /current', () => {
  test('gets the current weather with city', async () => {
    const app = build()
    const expectedCity = 'Viedma'

    const response = await app.inject({
      method: 'GET',
      url: `${process.env.BASE_ROUTE}/current/${expectedCity}`
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toHaveProperty('city')
    expect(JSON.parse(response.body).city.name).toBe(expectedCity)
    expect(JSON.parse(response.body)).toHaveProperty('current')
    expect(JSON.parse(response.body).current).toHaveProperty('weather')
    expect(JSON.parse(response.body).current).toHaveProperty('main')
  })

  test('gets the current weather without city', async () => {
    const app = build()

    const response = await app.inject({
      method: 'GET',
      url: `${process.env.BASE_ROUTE}/current`
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toHaveProperty('city')
    expect(JSON.parse(response.body).city).toHaveProperty('name')
    expect(JSON.parse(response.body)).toHaveProperty('current')
    expect(JSON.parse(response.body).current).toHaveProperty('weather')
    expect(JSON.parse(response.body).current).toHaveProperty('main')
  })

  test('invalid city', async () => {
    const app = build()
    const invalidCity = 'Neverland'

    const response = await app.inject({
      method: 'GET',
      url: `${process.env.BASE_ROUTE}/current/${invalidCity}`
    })

    expect(response.statusCode).toBe(500)
  })
})

describe('Forecast: /current', () => {
  test('gets forecast with city', async () => {
    const app = build()
    const expectedCity = 'Viedma'

    const response = await app.inject({
      method: 'GET',
      url: `${process.env.BASE_ROUTE}/forecast/${expectedCity}`
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toHaveProperty('city')
    expect(JSON.parse(response.body).city).toBe(expectedCity)
    expect(JSON.parse(response.body)).toHaveProperty('forecast')
    expect(JSON.parse(response.body).forecast).toHaveProperty('list')
    expect(JSON.parse(response.body).forecast.list[0]).toHaveProperty('weather')
  })

  test('gets forecast without city', async () => {
    const app = build()

    const response = await app.inject({
      method: 'GET',
      url: `${process.env.BASE_ROUTE}/forecast`
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toHaveProperty('city')
    expect(JSON.parse(response.body)).toHaveProperty('forecast')
    expect(JSON.parse(response.body).forecast).toHaveProperty('list')
    expect(JSON.parse(response.body).forecast.list[0]).toHaveProperty('weather')
  })

  test('invalid city', async () => {
    const app = build()
    const invalidCity = 'Neverland'

    const response = await app.inject({
      method: 'GET',
      url: `${process.env.BASE_ROUTE}/forecast/${invalidCity}`
    })

    expect(response.statusCode).toBe(500)
  })
})
