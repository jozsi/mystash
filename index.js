const app = require('./app');
const config = require('./config');

if (!module.parent) {
  app.listen(config.HTTP_PORT, () => {
    console.log(`Server running on port ${config.HTTP_PORT}`);  // eslint-disable-line no-console
  });
}
