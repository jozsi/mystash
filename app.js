const Koa = require('koa');
const config = require('./config');

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

if (!module.parent) {
  app.listen(config.HTTP_PORT, () => {
    console.log(`Server running on port ${config.HTTP_PORT}`);  // eslint-disable-line no-console
  });
}

module.exports = app;
