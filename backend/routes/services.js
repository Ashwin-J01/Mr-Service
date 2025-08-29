const express = require('express');
const router = express.Router();
const Service = require('../models/service');

// Get all services
router.get('/', async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

// Add a new service
router.post('/', async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
