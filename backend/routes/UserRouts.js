const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import our User model

// @route   POST /api/users/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // 2. Create new user instance
        user = new User({
            username,
            password,
        });

        // 3. Hash the password
        const salt = await bcrypt.genSalt(10); // Create a "salt"
        user.password = await bcrypt.hash(password, salt); // Hash the password

        // 4. Save user to database
        await user.save();

        // 5. Create and return a JWT (JSON Web Token)
        const payload = {
            user: {
                id: user.id, // This is the user's _id from the database
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // We need to create this secret key
            { expiresIn: '1h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Send the token to the client
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/users/login
// @desc    Log in a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // 2. Compare the provided password with the hashed password in the DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // 3. If credentials are correct, create and return a JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;