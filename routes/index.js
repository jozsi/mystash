const jwt = require('koa-jwt');
const Router = require('koa-router');
const user = require('./user');
const { JWT_SECRET } = require('../config');

const router = new Router();
const jwtMiddleware = jwt({ secret: JWT_SECRET });

router.get('/', async (ctx) => {
  ctx.body = 'Hello World';
});

router.use('/user', jwtMiddleware.unless({ method: 'POST' }), user.routes());

module.exports = router;
