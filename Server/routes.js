const express = require('express');
const router = express.Router();
const { userModel } = require('./UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.use(express.json());



// Signup route with bcrypt password hashing and rate limiting
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username is already taken' });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
        const newUser = await userModel.create({ username, password: hashedPassword });
        // Send a response indicating successful signup
        res.status(201).json({ message: 'Signup successful', user: newUser });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

// Login route with bcrypt password verification and JWT tokenization
// router.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;    
//         const user = await userModel.findOne({ username });
//         if (!user) {
//             console.log(`Login attempt failed for username: ${username}`);
//             return res.status(401).json({ error: 'Invalid username or password' });
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password); // Comparing hashed password
//         if (!isPasswordValid) {
//             console.log(`Login attempt failed for username: ${username}`);
//             return res.status(401).json({ error: 'Invalid username or password' });
//         }
//         console.log(`Login attempt successful for username: ${username}`);
//         const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
//         res.status(200).json({ success: true, message: 'Login successful', token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/data', async (req, res) => {
    try {
        const data = await userModel.find();
        res.status(200).send(data);
    } catch (err) {
        let statusCode = 500;
        let errorMessage = "Internal Server Error";

        if (err.name === 'ValidationError') {
            statusCode = 400;
            errorMessage = "Validation Error";
        } else if (err.name === 'CastError') {
            statusCode = 404;
            errorMessage = "Resource Not Found";
        } else {
            console.error(err);
        }

        res.status(statusCode).send(errorMessage);
    }
});

module.exports = router;