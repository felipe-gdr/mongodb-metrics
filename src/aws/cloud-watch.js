const AWS = require('aws-sdk');

const settings = require('../settings');

AWS.config.update({
    secretAccessKey: settings.aws.secretAccessKey,
    accessKeyId: settings.aws.accessKeyId,
    region: settings.aws.region
});

const sendMetric = ({ metricName, stat, value = 1 })=> {
    const cloudWatch = new AWS.CloudWatch();
    const { namespace } = settings.aws.cloudWatch;

    const params = {
        MetricData: [
            {
                MetricName: metricName,
                Dimensions: [
                    {
                        Name: 'stat',
                        Value: stat,
                    }
                ],
                Value: value,
                Unit: 'Count',
            },
        ],
        Namespace: namespace
    };

    return new Promise((resolve, reject) => {
        cloudWatch.putMetricData(params, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

module.exports = {
    sendMetric
};
