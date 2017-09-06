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

    const links = [];
    data.Contents.forEach((d) => {
      links.push(`${params.Bucket}.s3.amazonaws.com/${d.Key}`);
    });

    return res.json({
      success: true,
      links,
    });
  });
});

module.exports = router;

