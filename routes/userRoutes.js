const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post()

module.exports = router;
