import build from '../src/app.js'
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
})
