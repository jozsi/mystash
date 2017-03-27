const CONFIG = require('../../config');

const logger = require('winston');

logger.level = CONFIG.LOGGING_LEVEL;
logger.add(logger.transports.File, { filename: CONFIG.LOG_FILE });

module.exports = logger;
