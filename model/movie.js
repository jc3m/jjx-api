const db = require('./index');

const COLLECTION_NAME = 'movies';

function getMovies() {
  return db.getCollection(COLLECTION_NAME)
    .then((col) => {
      return new Promise((resolve, reject) => {
        col.find().toArray((err, docs) => {
          if (err) {
            reject(err);
          } else {
            resolve(docs);
          }
        });
      });
    });
}

module.exports = {
  getMovies,
};
