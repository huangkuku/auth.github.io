// all of our different workouts routes are inside here: using express.Router
const express =require("express");
const router = express.Router();
const {getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout} = require("../controllers/workoutController");

// GET all workouts route
// 之前: router.get("/", (req, res)=>{
//     res.json({msg:"Get all workouts."});
// });
router.get("/", getWorkouts);

// GET a single workout route
router.get("/:id", getWorkout);

// POST a new workout route
router.post("/", createWorkout);

// delete a workout route
router.delete("/:id", deleteWorkout);

// Update a workout route
router.patch("/:id",updateWorkout);

module.exports = router;