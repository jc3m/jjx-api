const db = require('./index');

const COLLECTION_NAME = 'movies';

async function getMovies() {
  const col = await db.getCollection(COLLECTION_NAME);

  return new Promise((resolve, reject) => {
    col.find({}, { sort: { 'title': 1 } }).toArray((err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

async function addMovie(title, url) {
  const col = await db.getCollection(COLLECTION_NAME);

  return new Promise((resolve, reject) => {
    col.insertOne({
      title,
      ref: url,
    }, null, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  COLLECTION_NAME,
  getMovies,
  addMovie
};
