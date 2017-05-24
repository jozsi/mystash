const app = require('./app');
const { DB_URI, HTTP_PORT } = require('./config');
const db = require('./db');
const router = require('./routes');

const onInit = () => {
  app.use(router.routes());
  console.log(`Running [DB:${db.connection.name}] [HTTP:${HTTP_PORT}]`);  // eslint-disable-line no-console
};

const onError = ({ message }) => {
  console.error(`Error: ${message}`);  // eslint-disable-line no-console
  process.exit(1);
};

Promise
  .all([
    new Promise((resolve, reject) => app.listen(HTTP_PORT, resolve).on('error', reject)),
    db.connect(DB_URI),
  ])
  .then(onInit)
  .catch(onError);
