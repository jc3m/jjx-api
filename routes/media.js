const express = require('express');
const AWS = require('aws-sdk');

const AWSConfig = require('../conf/aws');

const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: AWSConfig.awsAccessKeyId,
  secretAccessKey: AWSConfig.awsSecretAccessKey,
});

router.get('/', (req, res, next) => {
  const params = {
    Bucket: AWSConfig.s3Bucket,
  };
  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      return next(err);
    }

    const prefix = `${params.Bucket}.s3.amazonaws.com`;
    const keys = [];
    data.Contents.forEach((d) => {
      keys.push(d.Key);
    });

    return res.json({
      success: true,
      prefix,
      keys,
    });
  });
});

module.exports = router;

