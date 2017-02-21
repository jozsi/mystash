const Koa = require('koa');
const config = require('./config');
const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = 'Hello world';
});

app.listen(config.HTTP_PORT, () => {
  console.log(`Server running on port ${config.HTTP_PORT}`);
});
