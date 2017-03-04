const Router = require('koa-router');
const jwt = require('./jwt');
const User = require('../models/user');

const router = new Router();

router.post('/', async (ctx) => {
  const user = await new User(ctx.request.body).save();
  ctx.body = user;
});

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !await user.comparePassword(password)) {
    const error = new Error('Login failed');
    error.status = 401;
    throw error;
  }
  ctx.body = user;
});

router.use(jwt);

router.get('/', async (ctx) => {
  const user = await User.findById(ctx.state.user.id);
  ctx.body = user;
});

router.put('/', async (ctx) => {
  const user = await User.findByIdAndUpdate(ctx.state.user.id, ctx.request.body, { new: true });
  ctx.body = user;
});

module.exports = router;
