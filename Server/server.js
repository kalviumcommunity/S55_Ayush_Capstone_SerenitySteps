const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const {userModel} = require("./UserSchema.js")
const bcrypt = require('bcrypt')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });


let connectionStatus = 'disconnected';

const startDatabase = async () => {
    try {
        await mongoose.connect(process.env.URI);
        connectionStatus = "The database has been connected!!";
    } catch (err) {
        console.error("Failed to connect to database",err);
        connectionStatus = "Failed to connect to database";
    }
};

app.get('/data', async (req, res) => {
    try {
        console.log(userModel);
        const data = await userModel.find();
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



app.post('/signup', async (req, res) => {
    console.log(req.body,"req")
    
    try {
        
        // Check if the email already exists
        const emailExists = await userModel.findOne({ email: req.body.email});
        if (emailExists) {
            console.log("email exists")
            return res.status(400).send("User already exists");
        }
        // Hash the password
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Create a new user
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({message:"congrats",data:newUser});
    } catch (err) {
        console.error("Error in signing up user", err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found. Please create an account.");
        }
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            return res.status(200).json({
                message: "You logged in successfully!",
                userId: user._id
            });
        } else {
            return res.status(401).send("Incorrect password");
        }
    } catch (error) {
        console.error("Error while comparing passwords:", error);
        res.status(500).send("Internal Server Error");
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