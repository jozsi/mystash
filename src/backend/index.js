require('react-scripts/config/env');
const dotenv = require('dotenv');
const fs = require('fs');
const app = require('./app');
const db = require('./db');

const onError = ({ message }) => {
  console.error(`Error: ${message}`); // eslint-disable-line no-console
  process.exit(1);
};

if (!process.env.DOTENV_LOADED) {
  const dotenvSample = '.env.example';
  if (fs.existsSync(dotenvSample)) {
    console.error(`WARNING! Missing .env file, falling back to ${dotenvSample}`); // eslint-disable-line no-console
    dotenv.config({
      path: dotenvSample,
    });
  } else {
    onError(new Error(`Missing .env file, and no fallback found (${dotenvSample})`));
  }
}

const { API_PORT, DB_URI } = process.env;

const onInit = () => {
  console.log(`Running [DB:${db.connection.name}] [HTTP:${API_PORT}]`); // eslint-disable-line no-console
};

Promise
  .all([
    new Promise((resolve, reject) => app.listen(API_PORT, resolve).on('error', reject)),
    db.connect(DB_URI),
  ])
  .then(onInit)
  .catch(onError);
