import React, {useState} from "react";
import "./TodoList.css";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import {v4 as uuid} from "uuid";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const addTodo = (newTodo) => {
        newTodo.id = uuid();
        setTodos(todos => [...todos, newTodo])
    }
    const removeTodo = (todoId) => {
        setTodos(todos => todos.filter(todo => todo.id !== todoId))
    }
    const completeTodo = (todoId) => {
        setTodos(todos => 
            todos.map(todo => 
                todo.id !== todoId ? todo : { ...todo, style: !todo.style }
            )
        );
    }    

    return (
        <div className="TodoList">
            <div>
                <NewTodoForm addTodo={addTodo}/>
            </div>
            <div className="TL-list">
                {todos.map(t => <Todo 
                                    todo={t} 
                                    remove={() => removeTodo(t.id)}
                                    complete={() => completeTodo(t.id)}
                                    key={t.id}
                                />)}
            </div>
        </div>
    )
}

export default TodoList;