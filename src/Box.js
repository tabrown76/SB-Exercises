import React from "react";
import "./Box.css";

const Box = ({backgroundColor, height, width, onClick}) => {
    return (
        <div className="Box" style={{
                                backgroundColor: backgroundColor,
                                height: `${height}px`,
                                width: `${width}px`
                            }}
        >        
            <button className="BoxButton" onClick={onClick}>X</button>
        </div>
    )
}

export default Box;