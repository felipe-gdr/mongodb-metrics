const defaultSettings = {
    logsDir: './logs',
    mongodb: {
        user: '',
        password: '',
        url: 'mongodb://localhost:27017',
    },
    aws: {
        cloudWatch: {
            namespace: 'my-namespace'
        }
    }
};

module.exports = defaultSettings;
