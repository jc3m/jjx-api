/* eslint no-console: 0 */

const mongodb = require('mongodb');
const chalk = require('chalk');

const conf = require('../conf/mongodb');

let db;

function initializeConnection(callback) {
  initConnectionBackoff(callback, 0);
}

function initConnectionBackoff(callback, iteration) {
  mongodb.MongoClient.connect(conf.mongodbURI, (err, pDb) => {
    if (err && iteration < 7) {
      const sleep = 100 * Math.pow(2, iteration);
      console.log(chalk.yellow(`Connection failed, retrying, iteration ${iteration}`));
      setTimeout(() => initConnectionBackoff(callback, iteration + 1), sleep);
    } else if (err) {
      console.log(chalk.red(err));
      process.exit(1);
    } else {
      console.log(chalk.cyan('Connected to MongoDB'));
      db = pDb;
      callback();
    }
  });
}

async function initializeIndicies() {
  const movieCol = await getCollection(require('./movie').COLLECTION_NAME);
  movieCol.createIndex({ 'title': 1 });
}

function getDb() {
  return db;
}

function getCollection(collectionName, callback) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName, (err, collection) => {
      if (err) {
        reject(err);
      } else {
        resolve(collection);
      }
    });
  });
}

module.exports = {
  initializeConnection,
  initializeIndicies,
  getCollection,
  getDb,
};
