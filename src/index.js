const {sendMetric} = require('./aws/cloud-watch');
const settings = require('./settings/settings');
const logger = require('./log');
const {getConnectionInfo} = require('./db-status');

const CronJob = require('cron').CronJob;

const execute = async () => {
    const {mongodb} = settings;

    const connections = await getConnectionInfo(mongodb);

    try {
        const promises = Object.keys(connections).map(key => {
            const value = connections[key];
            return sendMetric({metricName: 'mongodb.status.connections', stat: key, value});
        });

        await Promise.all(promises);

    } catch (error) {
        logger.error('Error sending metrics to Cloud Watch');
        logger.error(error);
    }
};

if (settings.cron) {
    logger.info('Registering cron job');
    new CronJob(settings.cron, execute, null, true);
} else {
    logger.info('One time execution');
    execute();
}
