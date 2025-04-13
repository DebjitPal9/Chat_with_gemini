const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Google OAuth login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {
    try {
      // Check if user exists
      let user = await User.findOne({ googleId: req.user.id });

      if (!user) {
        // Create new user
        user = new User({
          googleId: req.user.id,
          displayName: req.user.displayName,
        });
        await user.save();
      }

      // Redirect to frontend with userId as a query parameter
      res.redirect(`http://localhost:8000/chatpage.html?userId=${user._id}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;