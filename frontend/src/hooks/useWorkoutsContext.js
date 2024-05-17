import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext = ()=>{
    const context = useContext(WorkoutsContext) 
    // <WorkoutsContext.Provider value={{...state, dispatch}}> => WorkoutsContext with value={{...state, dispatch}}
    // context is a Obj which with ...state, dispatch
    if (!context){
        throw Error("useWorkoutContext must be used inside an WorkoutsContextProvider")
    }

    return context
}