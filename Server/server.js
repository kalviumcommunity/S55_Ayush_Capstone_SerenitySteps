const express = require('express')
const app = express()
require('dotenv').config()
const connection = process.env.URI;
const mongoose = require('mongoose')

let connectionStatus = 'disconnected';

const startDatabase = async () => {
    try {
        await mongoose.connect(connection);
        connectionStatus = "The database has been connected!!";
    } catch (err) {
        console.error("Failed to connect to database",err);
        connectionStatus = "Failed to connect to database";
    }
};

app.get('/',(req,res)=>{
    res.send(connectionStatus)
})

app.listen(process.env.PORT,()=>{
    startDatabase()
    console.log('success')
})

module.exports = app