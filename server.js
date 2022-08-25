import build from './src/app.js'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

const server = build({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  }
})

server.listen({ port: process.env.PORT }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})

export default server
