const app = require('./app');
const CONFIG = require('./config');
const db = require('./db');
const router = require('./routes');

app.listen(CONFIG.HTTP_PORT, async function onListening() {
  await db.connect(CONFIG.DB_URI);
  console.log(`Running [DB:${db.connection.name}] [HTTP:${this.address().port}]`);  // eslint-disable-line no-console
  app.use(router.routes());
});
