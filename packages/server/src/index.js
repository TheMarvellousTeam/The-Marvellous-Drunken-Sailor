import koa from 'koa'
import koaRouter from 'koa-router'
import koaCors from 'koa-cors'
import corsError from 'koa2-cors-error'
import { initRoutes } from './route'

export const create = async () => {
  const app = new koa()

  // application storage layer
  app.context.storage = { room: {} }

  const router = new koaRouter()

  initRoutes(router)

  app.use(
    koaCors({
      origin: '*',
      headers: ['Authorization', 'Content-Type'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    })
  )

  app.use(corsError())
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.on('error', error => console.log(error))

  const server = app.listen(8088)

  console.log('listen to http://localhost:8088')

  // kill server
  return () => server.close()
}
