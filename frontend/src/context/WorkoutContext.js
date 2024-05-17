import {createContext, useReducer} from "react"
// createContext() create a brandnew context
export const WorkoutsContext = createContext(); // 可以給別的component使用該Context

export const workoutsReducer = (state, action)=>{ // state is {workouts: null} dispatch(資料一) action就接收'資料一'
    switch (action.type){   // dispatch(type:"", payload:{}) => action.type="", action.payload:{}
        case "SET_WORKOUTS":  // dispatch(type:"SET_WORKOUTS") => action.type="SET_WORKOUTS"
        // set all of the workouts
            return {
                workouts: action.payload  // workouts is [{...},...], action.payload is [{...},...]
            } // dispatch({type:"SET_WORKOUTS", payload: json})
        case "CREATE_WORKOUT":
            return {
                workouts: [action.payload, ...state.workouts] // going to be a new single workout 
                // state.workouts: array of pre-existing workout obj
                // action.payload是新的 在最上面, ...state.workouts是舊的 最舊的會在最下面
            }
        case "DELETE_WORKOUT":
            return {
                workouts: state.workouts.filter((w)=>w._id !== action.payload._id)
            }
        case "EDIT_WORKOUT":
            // console.log("action.payload:", action.payload);
            const{json, workout_detail} = action.payload;
            return {
                workouts: state.workouts.filter((w)=>w._id === json._id)
            }
        default: // 如果上面兩個case都不符合 就默認default
            return state // state is unchage
    }
}
// provide that context to our app component tree
export const WorkoutsContextProvider = ({ children })=>{ // { children } is <APP />
    // dispatch is func dispatch(type:"",payload:{} or []) type:"" change state, payload:{} or [] represents any data we needto make this change
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null // workouts is arr include many Objs, like workouts=[{...},{...},{...},...]
    })
    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children } {/* { children } is <APP/> component in the index.js */}
        </WorkoutsContext.Provider>
    )
}