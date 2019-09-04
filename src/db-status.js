const MongoClient = require('mongodb').MongoClient;
const logger = require('./log');

const getConnectionInfo = async ({url, database, user, password}) => {
    const client = await new MongoClient(url).connect();

    try {
        const db = client.db(database, {
            auth: {
                user,
                password,
            },
        });

        const admin = db.admin();

        const status = await admin.serverStatus();

        return status.connections;

    } catch (err) {
        logger.error('Error getting MongoDB connection info')
        logger.error(err);
    } finally {
        client.close();
    }
};

module.exports = {
    getConnectionInfo,
};

