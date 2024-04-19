const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    password: String
    
});
const Model = mongoose.model("users", userSchema);
module.exports = {Model};