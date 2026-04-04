const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

// POST /api/chat - Public endpoint for the chatbot
router.post('/', chatController.handleChat);

module.exports = router;
