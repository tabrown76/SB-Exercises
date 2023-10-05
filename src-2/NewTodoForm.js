import React, {useState} from "react";
import "./NewTodoForm.css";

const NewTodoForm = ({addTodo}) => {
    const [formData, setFormData] = useState({todo: ''});
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(formData);
        setFormData({todo: ''});
    }

    return (
        <form className="NewTodoForm" onSubmit={(handleSubmit)}>
            <label className="NTF-label" htmlFor="todo">To-Do:</label>
            <input className="NTF-input"
                id="todo"
                type="text"
                name="todo"
                value={formData.todo}
                onChange={handleChange}
                placeholder="To-Do"
            />
            <button>Add To-Do</button>
        </form>
    )
}

export default NewTodoForm;