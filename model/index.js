/* eslint no-console: 0 */

const mongodb = require('mongodb');
const chalk = require('chalk');

const conf = require('../conf/mongodb');

let db;

function initConnectionBackoff(callback, iteration) {
  mongodb.MongoClient.connect(conf.mongodbURI, (err, pDb) => {
    if (err && iteration < 7) {
      const sleep = 100 * (iteration ** 2);
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

function initializeConnection(callback) {
  initConnectionBackoff(callback, 0);
}

function getCollection(collectionName) {
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

function getDb() {
  return db;
}

module.exports = {
  initializeConnection,
  getCollection,
  getDb,
};
