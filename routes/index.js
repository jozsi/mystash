const Router = require('koa-router');
const user = require('./user');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello World';
});

router.use('/user', user.routes());

module.exports = router;
