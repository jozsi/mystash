const Router = require('koa-router');
const users = require('./users');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello World';
});

router.use('/users', users.routes());

module.exports = router;
