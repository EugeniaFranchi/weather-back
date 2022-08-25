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
  test('gets the current weather', async () => {
    const app = build()
    const expectedCity = 'Viedma'

    const response = await app.inject({
      method: 'GET',
      url: `${process.env.BASE_ROUTE}/current/${expectedCity}`
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toHaveProperty('city')
    expect(JSON.parse(response.body).city).toBe(expectedCity)
    expect(JSON.parse(response.body)).toHaveProperty('current')
    expect(JSON.parse(response.body).current).toHaveProperty('weather')
    expect(JSON.parse(response.body).current).toHaveProperty('main')
  })
})
