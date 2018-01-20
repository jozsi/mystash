const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const history = require('koa-connect-history-api-fallback');
const serve = require('koa-static');
const router = require('./routes');

const app = new Koa();

app.context.router = router;

app.use(history({ htmlAcceptHeaders: ['text/html'] }));
app.use(serve('build', { index: false }));

app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.response.status === 404 && !ctx.response.body) {
      ctx.throw(404);
    }
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    console.error(err);
    ctx.body = {
      error: err.message,
    };
  }
});
app.use(bodyParser());
app.use(router.routes());

module.exports = app;
