export const initRoutes = app =>
  app.get('/health', (ctx, next) => (ctx.body = 'ok'))
