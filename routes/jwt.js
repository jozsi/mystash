const jwt = require('koa-jwt');
const { JWT_SECRET } = require('../config');

module.exports = jwt({ secret: JWT_SECRET });
