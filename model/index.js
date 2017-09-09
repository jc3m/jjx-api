/* eslint no-console: 0 */

const mongodb = require('mongodb');
const chalk = require('chalk');

const conf = require('../conf/secure');

let db;

function initializeConnection(callback) {
  mongodb.MongoClient.connect(conf.mongodbURI, (err, pDb) => {
    if (err) {
      console.log(chalk.red(err));
      process.exit(1);
    }
    console.log(chalk.cyan('Connected to MongoDB'));
    db = pDb;
    callback();
  });
}

function getDb() {
  return db;
}

function getCollection(collectionName, callback) {
  db.collection(collectionName, callback);
}

module.exports = {
  initializeConnection,
  getCollection,
  getDb,
};

