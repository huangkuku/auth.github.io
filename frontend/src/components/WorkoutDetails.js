import { useWorkoutContext } from "../hooks/useWorkoutsContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext()
    // communicate with our api
    const handleClick = async()=>{
        const url = 'http://localhost:4000/api/workouts/';
        const response = await fetch(url+ workout._id, { // response, Response {type: 'cors', url: 'http://localhost:4000/api/workouts/刪掉的id
            method:"DELETE"
        })
        const json = await response.json() // json是被我delete的資料
        if (response.ok){
            // dispatch some kind of action to update/change state so need to case Delete...
            // import useWorkoutContext dispatch.action
            dispatch({type:"DELETE_WORKOUT", payload: json}) // json, delete from the state
        }
    }
    const ToEdit = async ()=>{
        const url = 'http://localhost:4000/api/workouts/';
        const res = await fetch(url+ workout._id,{
            method:"PATCH",
            body: JSON.stringify(workout), // workout 轉換成json string 
            headers:{
                "Content-type":"application/json"
            }
        });
        const json = await res.json();
        const workout_detail = url+ `${workout._id}`; // 得到該項的url
        if (res.ok){
            dispatch({type:"EDIT_WORKOUT", payload:{
                json: json,
                workout_detail: workout_detail
            }})
        }
    }
    return (
        <div className="workout-details">
            <h4>{ workout.title }</h4>
            <p><strong>Load (kg):</strong> { workout.load } </p>
            <p><strong>Reps:</strong> { workout.reps } </p>            
            <p>
                {workout.createdAt}<br/>
                { formatDistanceToNow( new Date(workout.createdAt), { addSuffix: true}) }
            </p>            
            <span>
                <p className="material-symbols-outlined" onClick={ handleClick }>Delete</p>
                <p onClick={ ToEdit }>edit</p>
            </span> {/* add a trashcan */}            
        </div>
    )
}

export default WorkoutDetails