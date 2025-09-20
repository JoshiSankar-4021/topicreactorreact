import { NavLink } from "react-router-dom";
import './Navbar.css';
function Navbar(){
    return(
        <div className="navbar-wrapper">
            <div className="navbar-div">
            <NavLink to='/Profile' className='Navbar-navlink'>Profile</NavLink>
            <NavLink to='/CreateTopic' className='Navbar-navlink'>Create Topic</NavLink>
            <NavLink to='/Topics' className='Navbar-navlink'>Topics</NavLink>
            <NavLink to='/MyContent' className='Navbar-navlink'>My Content</NavLink>
            <NavLink to='/Allusers' className='Navbar-navlink'>All Users</NavLink>
            </div>
        </div>
    )
}
export default Navbar;