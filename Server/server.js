const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const Router = require('./routes.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Custom headers for CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

// Routes
app.use(Router);

let connectionStatus = 'disconnected';

const startDatabase = async () => {
    try {
        await mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true });
        connectionStatus = "The database has been connected!!";
    } catch (err) {
        console.error("Failed to connect to database", err);
        connectionStatus = "Failed to connect to database";
    }
};

app.get('/', (req, res) => {
    res.send(connectionStatus);
});

app.listen(process.env.PORT, () => {
    startDatabase();
    console.log('Server is running');
});

module.exports = app;
