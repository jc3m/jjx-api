const express = require('express');
const AWS = require('aws-sdk');

const movieModel = require('../model/movie');
const showModel = require('../model/show');
const episodeModel = require('../model/episode');
const AWSConfig = require('../conf/aws');

const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: AWSConfig.awsAccessKeyId,
  secretAccessKey: AWSConfig.awsSecretAccessKey,
});

const s3Prefix = `${AWSConfig.s3Bucket}.s3.amazonaws.com`;

router.get('/', (req, res, next) => {
  const getMoviesAndShows = async () => {
    const movies = movieModel.getMovies();
    const shows = showModel.getShows();
    return ({
      movies: (await movies),
      shows: (await shows),
    });
  };
  getMoviesAndShows().then((docs) => {
    res.json(docs);
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

router.post('/shows', (req, res, next) => {
  showModel.addShow(req.body.title, req.body.showId)
    .then(() => res.json({}))
    .catch((err) => next(err));
});

router.get('/shows/:showId', (req, res, next) => {
  async function getShow(showId) {
    const title = showModel.getShowTitle(showId);
    const episodes = episodeModel.getEpisodes(showId);
    return ({
      title: (await title),
      episodes: (await episodes),
    });
  }
  getShow(req.params.showId)
    .then((showInfo) => res.json(showInfo))
    .catch((err) => next(err));
});

router.post('/shows/ep', (req, res, next) => {
  const { showId, season, episode, title, url } = req.body;
  const valid = (x) => {
    const n = (Number(x));
    return Number.isInteger(n) && n > 0;
  };
  if (!valid(season)) {
    next(new Error('Invalid show season'));
  } else if (!valid(episode)) {
    next(new Error('Invalid episode number'));
  } else {
    episodeModel.addEpisode(showId, Number(season), Number(episode), title, url)
      .then(() => res.json({}))
      .catch((err) => next(err));
  }
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
