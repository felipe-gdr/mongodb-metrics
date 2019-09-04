const settings = {
    logsDir: './logs',
    cron: '* * * * * *',
    mongodb: {
        user: '',
        password: '',
        url: 'mongodb://localhost:27017',
        database: ''
    },
    aws: {
        secretAccessKey: '',
        accessKeyId: '',
        region: '',
        cloudWatch: {
            namespace: 'ops'
        }
    }
};

module.exports = settings;
