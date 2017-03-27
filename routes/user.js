const Router = require('koa-router');
const User = require('../models/user');
const Logger = require('../src/logger/logger');

const router = new Router();

router.post('/', async (ctx) => {
  const user = await new User(ctx.request.body).save();
  ctx.body = user;
});

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    Logger.log('info', '[Login] Failed login attempt from <%s> - wrong username', ctx.request.header['x-forwarded-for']);
    const error = new Error('User does not exist.');
    error.status = 404;
    throw error;
  }
  if (!await user.comparePassword(password)) {
    Logger.log('info', '[Login] Failed login attempt from <%s> - wrong password', ctx.request.header['x-forwarded-for']);
    const error = new Error('Wrong password.');
    error.status = 401;
    throw error;
  }
  ctx.body = user;
});

router.get('/', async (ctx) => {
  const user = await User.findById(ctx.state.user.id);
  ctx.body = user;
});

router.put('/', async (ctx) => {
  const user = await User.findByIdAndUpdate(ctx.state.user.id, ctx.request.body, { new: true });
  if (!user) {
    Logger.log('info', '[User] Could not find user to update (id: %s)', ctx.state.user.id);
  }
  ctx.body = user;
});

module.exports = router;
