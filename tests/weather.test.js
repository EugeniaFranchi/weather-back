import build from '../src/app.js'

describe('Base endpoint: /v1', () => {
  test('gets the base endpoint', async () => {
    const app = build()

    const response = await app.inject({
      method: 'GET',
      url: '/v1'
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body).status).toBe('up')
  })
})
