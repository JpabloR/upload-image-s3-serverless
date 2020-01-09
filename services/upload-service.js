const aws = require('aws-sdk');
var request = require('request');

aws.config.update({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION
});

const s3 = new aws.S3();

exports.uploadImage = function(url, key, callback) {
    request({
        url: url,
        encoding: null
    }, function(err, res, body) {
        console.log("into function")
        console.log("error is", err)
        console.log("res is", res)
        console.log("body is", body)
        if (err)
            return callback(err, res);

        s3.putObject({
            Bucket: "alfred-lead-images",
            Key: `${key}.png`,
            ContentType: res.headers['content-type'],
            ContentLength: res.headers['content-length'],
            Body: body // buffer
        }, callback);
    })
}