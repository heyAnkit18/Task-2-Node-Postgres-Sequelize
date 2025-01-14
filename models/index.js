const { Sequelize } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
});

const db = {};

// Import User model
db.User = require('../models/User')(sequelize, Sequelize.DataTypes);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;