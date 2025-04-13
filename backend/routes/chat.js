const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const User = require('../models/User');

// Save a chat
router.post('/', async (req, res) => {
  try {
    const { userId, content, isUserMessage } = req.body;

    // Create new chat
    const chat = new Chat({
      userId, // userId is a String
      content,
      isUserMessage
    });
    await chat.save();

    // Add chat to user's chat list
    await User.findOneAndUpdate(
      { googleId: userId }, // Find user by googleId (String)
      { $push: { chats: chat._id } }
    );

    res.status(201).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all chats for a user
router.get('/:userId', async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.params.userId }) // userId is a String
      .sort({ timestamp: 1 });
    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;