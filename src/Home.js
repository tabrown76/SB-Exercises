import React from "react";
import "./styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="Home">
            <Link to="/dogs">Dogs</Link>
            <Link to="/colors">Colors</Link>
        </div>
    )
}

export default Home;