require('./env');
const app = require('./app');
const db = require('./db');

const { API_PORT, DB_URI } = process.env;

const onInit = () => {
  console.log(`Running [DB:${db.connection.name}] [HTTP:${API_PORT}]`); // eslint-disable-line no-console
};

const onError = ({ message }) => {
  console.error(`Error: ${message}`); // eslint-disable-line no-console
  process.exit(1);
};

Promise
  .all([
    new Promise((resolve, reject) => app.listen(API_PORT, resolve).on('error', reject)),
    db.connect(DB_URI, { useMongoClient: true }),
  ])
  .then(onInit)
  .catch(onError);
