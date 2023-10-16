import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./styles/Colors.css";

const Colors = () => {
    const colorsArray = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];      
    const [colors, setColors] = useState(
        JSON.parse(localStorage.getItem("colors")) || colorsArray
    );
    const [formData, setFormData] = useState({color: "#000000"});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setColors(colors => [...colors, formData.color]);
        setFormData({color: "#000000"});
    }

    useEffect(() => {
        localStorage.setItem("colors", JSON.stringify(colors));
    }, [colors]);

    return (
        <div className="Colors">
            <form className="Colors-form">
                <input 
                    type="color" 
                    name="color" 
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <div className="Colors-links">
                {colors.map(c => 
                    <Link 
                        to={`/colors/${encodeURIComponent(c)}`} 
                        key={c} 
                        name={c}
                    >
                        <div className="Colors-div" style={{backgroundColor: c}}></div>
                    </Link>
                )}
            </div>            
        </div>
    )
}

export default Colors;