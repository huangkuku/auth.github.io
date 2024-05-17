import { useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = ()=>{
    const {dispatch} = useWorkoutContext()
    // 一開始form的title load reps是空白的 直到你開始在空格內輸入...
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    // handleSubmit for reaching a api
    const handleSubmit = async (e)=>{
        e.preventDefault()
        // creat some kind of dummy workout Obj send as the body of request
        const workout = {title, load, reps}
        const response = await fetch('http://localhost:4000/api/workouts/',{
            method:"POST",
            body: JSON.stringify(workout), // workout 轉換成json string 
            headers:{
                "Content-type":"application/json"
            }
        })
        // see the ./backend/controllers/workoutController 34-45
        const json = await response.json() //.json(workout)

        if (!response.ok){
            setError(json.error) //.json({error: error.message})
            setEmptyFields(json.emptyFields)
        }

        if (response.ok){
            setError(null)
            setTitle("")
            setLoad("")
            setReps("")
            setEmptyFields([])
            // console.log("new workout added", json)
            dispatch({type:"CREATE_WORKOUT", payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title:</label>
            <input 
            type="text"
            onChange={(e)=> setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes("title") ? "error":""}
            />
            <label>Load (in Kg):</label>
            <input 
            type="number"
            onChange={(e)=> setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes("load") ? "error":""}
            />
            <label>Reps:</label>
            <input 
            type="reps"
            onChange={(e)=> setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes("reps") ? "error":""}
            />
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default WorkoutForm