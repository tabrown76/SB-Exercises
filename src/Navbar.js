import React, {Link} from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
    return (
        <div className="Navbar">
            <Link to="/">Home</Link>
            <Link to="/dogs">Dogs</Link>
            <Link to="/colors">Colors</Link>
        </div>
    )
}

export default Navbar;