import React from "react";
import "./Todo.css";

const Todo = ({todo, remove, complete}) => {
    return (
        <div className="Todo">
            {
                !todo.style ?
                <>
                    <p className="Todo-todo" onClick={complete}>{todo.todo}
                        <button className="Todo-button" onClick={remove}>X</button>
                    </p>
                </>
                :
                <>
                    <s className="Todo-todo" onClick={complete}>{todo.todo}
                        <button className="Todo-button" onClick={remove}>X</button>
                    </s>
                </>
            }
        </div>
    )
}

export default Todo;