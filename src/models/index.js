const path = require('path');
const fs = require('fs');
// ==========================
const mongoose = require('mongoose');
// ==========================
const env = process.env.NODE_ENV || 'development';
const basename = path.basename(__filename);
const pathToConfig = path.resolve('src', 'config', 'mongoConfig');

const config = require(pathToConfig)[env];

mongoose
  .connect(`mongodb://${config.host}:${config.port}/${config.dbName}`)
  .then(() => console.log(`Connection to DB ${config.dbName} is done`))
  .catch((error) => console.log(error.message));

const dbMongo = {};

fs.readdirSync(__dirname)
  .filter((filename) => {
    return (
      filename.indexOf('.') !== 0 &&
      filename !== basename &&
      filename.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    dbMongo[model.modelname] = model;
  });

dbMongo.mongoose = mongoose;

module.exports = dbMongo;
