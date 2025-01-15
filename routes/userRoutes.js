// const express = require('express');
// const router = express.Router();
// const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/usercontroller');

// router.post('/users', createUser);
// router.get('/users', getAllUsers);
// router.get('/users/:id', getUserById);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const userController = require('../controllers/usercontroller');


// const upload = multer({ dest: 'uploads/' }).single('file');



// router.post('/users', userController.createUser);
// router.get('/users', userController.getAllUsers);
// router.get('/users/:id', userController.getUserById);
// router.put('/users/:id', userController.updateUser);
// router.delete('/users/:id', userController.deleteUser);


// router.get('/users/download/csv', userController.downloadCsv); 
// router.post('/users/upload/csv', upload.single('user'), userController.uploadCsv); 

// module.exports = router;



const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/usercontroller');
const path = require('path');

// Set up multer storage (optional but recommended)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Upload files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure file has a unique name
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Routes
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

router.get('/users/download/csv', userController.downloadCsv); 
router.post('/users/upload/csv', upload.single('user'), userController.uploadCsv);  // Make sure the field name matches

module.exports = router;
