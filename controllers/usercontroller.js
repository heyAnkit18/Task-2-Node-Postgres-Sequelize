// const { User } = require('../models');

// module.exports = {
//   createUser: async (req, res) => {
//     try {
//       const user = await User.create(req.body);
//       res.status(201).json(user);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   },
 

//   getAllUsers: async (req, res) => {
//     try {
//       const users = await User.findAll();
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   getUserById: async (req, res) => {
//     try {
//       const user = await User.findByPk(req.params.id);
//       if (user) {
//         res.status(200).json(user);
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   updateUser: async (req, res) => {
//     try {
//       const user = await User.findByPk(req.params.id);
//       if (user) {
//         await user.update(req.body);
//         res.status(200).json(user);
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   },

//   deleteUser: async (req, res) => {
//     try {
//       const user = await User.findByPk(req.params.id);
//       if (user) {
//         await user.destroy();
//         res.status(204).send();
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// };


const fs = require('fs');
const { User } = require('../models');
const { Parser } = require('json2csv');
const csvParser = require('csv-parser');
const { Op } = require('sequelize');

module.exports = {

  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.update(req.body);
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  
  downloadCsv: async (req, res) => {
    try {
      const { startId, endId } = req.query;
      const whereClause = {};

      if (startId && endId) {
        whereClause.id = {
          [Op.between]: [parseInt(startId, 10), parseInt(endId, 10)]
        };
      }

      const users = await User.findAll({ where: whereClause });
      const fields = ['name', 'email', 'age', 'createdAt', 'updatedAt'];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(users);

      res.header('Content-Type', 'text/csv');
      res.attachment('users.csv');
      res.send(csv);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Upload CSV
  uploadCsv: async (req, res) => {
    try {
      const users = [];
      const filePath = req.file.path;

      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          console.log('CSV Row:', row); 
          users.push(row);  
        })
        .on('end', async () => {
          try {
            await User.bulkCreate(users, { validate: true });
            fs.unlinkSync(filePath);  // Remove the uploaded file
            res.status(201).json({ message: 'Users uploaded successfully' });
          } catch (error) {
            res.status(400).json({ error: error.message });
          }
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};