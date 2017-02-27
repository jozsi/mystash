const Router = require('koa-router');
const users = require('./user');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello World';
});

router.use('/user', users.routes());

module.exports = router;
