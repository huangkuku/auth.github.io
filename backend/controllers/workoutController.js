// mongoose.model("Workout", workoutSchema);
const Workout = require("../models/workoutsModel");  
const mongoose = require("mongoose");

// get all workout 
const getWorkouts = async (req, res)=>{
    // display all workouts by db
    try{ // get newest ones on the top: .sort({根據什麼排列:1 / -1})
        const workout = await Workout.find({}).sort({createdAt:-1});
        res.status(200).json(workout);
    }catch(error){
        res.status(404).json({msg: error});
    };
};

// get a single workout 
const getWorkout = async (req, res)=>{
    // get /:id(e.g. http://locaolhost:3000/blog/12 id is 12)
    // grab id destructuring console.log(req.params.id); // 12; req.params = {id: 12}, it is object
    const {id} = req.params;
    // check id in the db, if not...
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"not such workout"});
    };
    const workout = await Workout.findById(id);
    // workout = null   !null= true
    if(!workout){
        return res.status(404).json({msg: "Not such workout"});
    }
    res.status(200).json(workout);
};

// create a single workout 
const createWorkout = async (req, res)=>{
    // req.body 3個資料
    const {title, reps, load} = req.body;

    let emptyFields = [];

    if (!title){
        emptyFields.push("title") //emptyFields = ["title"]
    }
    if (!load){
        emptyFields.push("load") //emptyFields = ["load"]
    }
    if (!reps){
        emptyFields.push("reps") //emptyFields = ["reps"]
    }
    if (emptyFields.length>0){ // 有上述的emptyFields.push()
        return res.status(400).json({error:"Please fill in all the fields", emptyFields})
    }
    // add a document to db
    try{
        // mongodb的collection是 workouts; model.create(a document obj {})
        const workout = await Workout.create({title, reps, load}) 
        res.status(200).json(workout)
    }catch(error){
        res.status(404).json({error: error.message});
    };
};
// delete a single workout 
const deleteWorkout = async (req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Not such workout"});
    }
    // _id is in the mongodb is property name
    const workout = await Workout.findOneAndDelete({_id: id});
    if(!workout){
        return res.status(404).json({msg: "Not such workout"});
    }
    res.status(200).json(workout);
    
}
// update a single workout 
const updateWorkout = async (req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Not such workout"});
    }
    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    });
    
    if(!workout){
        return res.status(404).json({msg: "Not such workout"});
    }
    res.status(200).json(workout);    
}

module.exports = {getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout};