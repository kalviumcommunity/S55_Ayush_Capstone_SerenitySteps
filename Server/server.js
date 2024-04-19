const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const {Model} = require("./UserSchema")

let connectionStatus = 'disconnected';

const startDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://ayushtiwari:ayushtiwari@cluster0.se8rtw5.mongodb.net/SerenityStepsDB?retryWrites=true&w=majority&appName=Cluster0');
        connectionStatus = "The database has been connected!!";
    } catch (err) {
        console.error("Failed to connect to database",err);
        connectionStatus = "Failed to connect to database";
    }
};

app.get('/data', async (req, res) => {
    try {
        console.log(Model);
        const data = await Model.find();
        console.log(data);
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

app.get('/',(req,res)=>{
    res.send(connectionStatus)
})

app.listen(process.env.PORT,()=>{
    startDatabase()
    console.log('success')
})

module.exports = app