const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Route to create a new user
router.post('/create', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const newUser = await Job.create({ name, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
