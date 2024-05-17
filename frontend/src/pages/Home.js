import { useEffect } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutsContext"

import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
    // const [workouts, setWorkouts]= useState(null)
    const {workouts, dispatch}= useWorkoutContext();
    useEffect(() => {
        const fetchWorkout = async () =>{
          const url = 'http://localhost:4000/api/workouts/';
          const response = await fetch(url)
          const json = await response.json() // json is array include some Obj ex json = [{...},{...},...]
  
          if (response.ok){ // response.ok is true
              // setWorkouts(json)
              dispatch({type:"SET_WORKOUTS", payload: json})
          }
        };
        fetchWorkout();
      }, [dispatch]
    )
    return (
        <div className="home">
            <div className="workouts">
                { workouts && workouts.map(workout=>(  // 等到workouts有資料了 才做workouts.map()
                    <WorkoutDetails key={ workout._id } workout = { workout }/> //return template
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}
export default Home