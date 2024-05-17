import { NavLink } from "react-router-dom" 
// NavLink 取代 Link 
const Navbar = () => {

    return (
        <header>
            <div className="container">
                <NavLink to="/">
                    <h1> Workout Buddy </h1>
                </NavLink>
            </div>
        </header>
    )
}

export default Navbar