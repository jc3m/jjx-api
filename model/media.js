const db = require('./index');

const COLLECTION_NAME = 'media';

function getMedia(callback) {
  db.getCollection(COLLECTION_NAME, (err, col) => {
    if (err) {
      callback(err);
    }
    col.find().toArray((cerr, docs) => {
      if (cerr) {
        callback(cerr);
      }
      callback(null, docs);
    });
  });
}

module.exports = {
  getMedia,
};

