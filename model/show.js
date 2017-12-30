const db = require('./index');

const COLLECTION_NAME = 'shows';

async function getShows() {
  const col = await db.getCollection(COLLECTION_NAME);

  return new Promise((resolve, reject) => {
    col.find({}, { sort: { title: 1 } }).toArray((err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

async function getShowTitle(showId) {
  const col = await db.getCollection(COLLECTION_NAME);

  return new Promise((resolve, reject) => {
    col.findOne({ showId }, { title: 1 }, {}, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc.title);
      }
    });
  });
}

async function addShow(title, showId) {
  const col = await db.getCollection(COLLECTION_NAME);

  return new Promise((resolve, reject) => {
    col.insertOne({
      title,
      showId,
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
  getShows,
  getShowTitle,
  addShow,
};
