// const sequelize=require('./config/db');

// sequelize.authenticate()
// .then(()=>{
//     console.log("Connected to the PostgreSQL database successfully.")
// })
// .catch(err=>{
//     console.error("Error occur")
// });

require('dotenv').config();

const sequelize = require('./config/db');

sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.error('Database connection failed:', err));

