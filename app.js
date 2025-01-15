const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes');
const db = require('./models');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Sync database
(async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log('Database connected and synced');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = app;