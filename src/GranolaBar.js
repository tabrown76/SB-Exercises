import React from "react";
import "./GranolaBar.css";
import GranolaBarImage from "./GranolaBar.png";

const GranolaBar = () => {
    return (
        <>
            <p className="GranolaBar-image-text">Hipster Zombie says</p>
            <div className="GranolaBar">
                <img className="GranolaBar-image" src={GranolaBarImage} alt="granola-bar"/>
            </div>
            <p className="GranolaBar-image-text">THANKS!</p>
        </>
    )
}

export default GranolaBar;