const Router = require('koa-router');
const jwt = require('./jwt');
const user = require('./user');
const wallet = require('./wallet');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello World';
});

router.use('/user', jwt.unless({ method: 'POST' }), user.routes());
router.use(jwt);
router.use('/wallet', wallet.routes());

module.exports = router;
