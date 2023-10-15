import React, {Link} from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="Navbar">
            <Link to="/">Vending Machine</Link>
            {/* <Link to="/potato-chips">Potato Chips</Link>
            <Link to="/granola-bar">Granola Bar</Link>
            <Link to="/peanuts">Peanuts</Link> */}
        </div>
    )
}

export default Navbar;