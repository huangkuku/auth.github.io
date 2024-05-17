// define how user doc should look
const mongoose =require("mongoose");
const Schema = mongoose.Schema;

// define user Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("User", userSchema)