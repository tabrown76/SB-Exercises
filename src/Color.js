import React, {useEffect} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import "./styles/Color.css";

const Color = () => {
    const {color} = useParams();
    const navigate = useNavigate();

    const isValidColor = (strColor) => {
        const s = new Option().style;
        s.color = strColor;
        return s.color !== '';
    }
    
    useEffect(() => {
        if (!isValidColor(color)) {
            navigate("/colors");
        }
    }, [color, navigate]);

    if (!isValidColor(color)) {
        return null;
    }

    return (
        <div className="Color" style={{backgroundColor: color}}>
            <button 
                className="Color-button">
                    <Link to="/colors" style={{color: color}}>Back</Link>
            </button>
        </div>
    )
}

export default Color;