const db = require('./index');
const movieModel = require('./movie');
const showModel = require('./show');

async function initialize() {
  const movieCol = db.getCollection(movieModel.COLLECTION_NAME);
  const showCol = db.getCollection(showModel.COLLECTION_NAME);
  (await movieCol).createIndex({ title: 1 });
  (await showCol).createIndex({ title: 1 });
}

module.exports = {
  initialize,
};
