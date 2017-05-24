require('react-scripts/config/env');
const app = require('./app');
const db = require('./db');
const router = require('./routes');

const { API_PORT, DB_URI } = process.env;

const onInit = () => {
  app.use(router.routes());
  console.log(`Running [DB:${db.connection.name}] [HTTP:${API_PORT}]`);  // eslint-disable-line no-console
};

const onError = ({ message }) => {
  console.error(`Error: ${message}`);  // eslint-disable-line no-console
  process.exit(1);
};

Promise
  .all([
    new Promise((resolve, reject) => app.listen(API_PORT, resolve).on('error', reject)),
    db.connect(DB_URI),
  ])
  .then(onInit)
  .catch(onError);
