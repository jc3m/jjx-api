const db = require('./index');

const COLLECTION_NAME = 'episodes';

async function getEpisodes(showId) {
  const col = await db.getCollection(COLLECTION_NAME);

  return new Promise((resolve, reject) => {
    col.find({ showId }, { sort: { season: 1, episode: 1 } }).toArray((err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

async function addEpisode(showId, season, episode, title, url) {
  const col = await db.getCollection(COLLECTION_NAME);

  return new Promise((resolve, reject) => {
    col.insertOne({
      showId,
      season,
      episode,
      title,
      url,
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
  getEpisodes,
  addEpisode,
};
