const express = require('express');
const AWS = require('aws-sdk');

const mediaModel = require('../model/media');
const AWSConfig = require('../conf/aws');

const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: AWSConfig.awsAccessKeyId,
  secretAccessKey: AWSConfig.awsSecretAccessKey,
});

const s3Prefix = `${AWSConfig.s3Bucket}.s3.amazonaws.com`;

router.get('/', (req, res, next) => {
  mediaModel.getMedia((err, docs) => {
    if (err) {
      return next(err);
    }

    return res.json({
      success: true,
      s3Prefix,
      docs,
    });
  });
});

router.get('/list', (req, res, next) => {
  const params = {
    Bucket: AWSConfig.s3Bucket,
  };
  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      return next(err);
    }

    const keys = [];
    data.Contents.forEach((d) => {
      keys.push(d.Key);
    });

    return res.json({
      success: true,
      message: 'Warning - Deprecated',
      prefix: s3Prefix,
      keys,
    });
  });
});

module.exports = router;
