const dotenv = require('dotenv-safe');

try {
  dotenv.load();
} catch (e) {
  console.error('Error: The following fields are missing from .env file:', e.missing.join(', ')); // eslint-disable-line no-console
  process.exit(1);
}
