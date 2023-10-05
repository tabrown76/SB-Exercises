import React, {useState} from "react";
import "./NewBoxForm.css";

const NewBoxForm = ({addBox}) => {
    const INITIAL_STATE = {
        backgroundColor: '',
        height: '',
        width: '',
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addBox({...formData});
        setFormData(INITIAL_STATE);
    }

    return (
        <form className="NewBoxForm" onSubmit={handleSubmit}>
            <label className="NBF-label" htmlFor="backgroundColor">Background Color:</label>
            <input className="NBF-input"
                id="backgroundColor"
                type="color"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleChange}
            />

            <label className="NBF-label" htmlFor="height">Height:</label>
            <input className="NBF-input"
                id="height"
                type="number"
                min="1"
                name="height"
                value={formData.height}
                onChange={handleChange}
            />

            <label className="NBF-label" htmlFor="width">Width:</label>
            <input className="NBF-input"
                id="width"
                type="number"
                min="1"
                name="width"
                value={formData.width}
                onChange={handleChange}
            />
            <button>Add Box!</button>
        </form>
    )
}

export default NewBoxForm;