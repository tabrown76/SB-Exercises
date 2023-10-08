import React from "react";
import "./Card.css";

const Card = ({alt, image, rotation, offsetY}) => {
    return (
        <img 
            className="Card" 
            src={image} 
            alt={alt} 
            style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(${offsetY}px)` }}
        />
    )
}

export default Card;