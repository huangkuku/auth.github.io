// define how my workout doc should look
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define workoutSchema
const workoutSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    reps:{
        type: Number,
        required: true
    },
    load:{
        type: Number,
        required: true
    }
}, {timestamps: true});

// make a model which based on the schemas export the model to interacte other file
module.exports = mongoose.model("Workout", workoutSchema);
//