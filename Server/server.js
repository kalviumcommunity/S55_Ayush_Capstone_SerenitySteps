const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const Router = require('./routes.js');

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // specify the allowed origin
    methods: 'GET,HEAD,OPTIONS,POST,PUT',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use(Router);

let connectionStatus = 'disconnected';

const startDatabase = async () => {
    try {
        await mongoose.connect(process.env.URI);
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
