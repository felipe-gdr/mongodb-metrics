const path = require('path');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const settings = require('./settings');

const fileTransport = new transports.DailyRotateFile({
    filename: path.join(settings.logsDir, 'mongodb-metrics-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d'
});

const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [fileTransport, new transports.Console()]
});

module.exports = logger;
