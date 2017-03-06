const Router = require('koa-router');

const router = new Router();

router.get('/', (ctx) => {
  const routes = [];
  ctx.router.stack.forEach((layer) => {
    if (layer.methods.length) {
      routes.push(`${layer.methods.slice(-1)[0]} ${layer.path.replace(/\/$/, '')}`);
    }
  });
  ctx.body = routes;
});

module.exports = router;
