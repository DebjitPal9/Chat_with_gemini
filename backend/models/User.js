const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true }, // Change to String
  displayName: { type: String, required: true },
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);