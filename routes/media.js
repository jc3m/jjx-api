const express = require('express');
const AWS = require('aws-sdk');

const movieModel = require('../model/movie');
const AWSConfig = require('../conf/aws');

const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: AWSConfig.awsAccessKeyId,
  secretAccessKey: AWSConfig.awsSecretAccessKey,
});

const s3Prefix = `${AWSConfig.s3Bucket}.s3.amazonaws.com`;

router.get('/', (req, res, next) => {
  movieModel.getMovies()
    .then((docs) => {
      res.json({
        movies: docs,
        shows: [],
      });
    }).catch((err) => {
      next(err);
    });
});

router.post('/movies', (req, res, next) => {
  movieModel.addMovie(req.body.title, req.body.url)
    .then(() => {
      res.json({});
    }).catch((err) => {
      next(err);
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
