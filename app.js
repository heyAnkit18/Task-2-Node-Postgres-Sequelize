const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const db = require('./models');
const errorHandler = require('./middlewares/errorHandler');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Sync database
(async () => {
  try {
    await db.sequelize.sync({ alter: true }); // Alter true to auto-update schema
    console.log('Database connected sucessfully and synced');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = app;