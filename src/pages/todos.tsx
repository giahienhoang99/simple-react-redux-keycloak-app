import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {addTodo, deleteTodo, toggleTodo} from "../store/todoSlice";

const Todos = () => {
    const [text, setText] = useState('');
    const todos = useSelector((state: RootState) => state.todos.todos);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (text.trim()) {
            dispatch(addTodo(text));
            setText('');
        }
    };
    const handleDeleteTodo = (id: number) => {
        dispatch(deleteTodo(id));
    };

    const handleToggleTodo = (id: number) => {
        dispatch(toggleTodo(id));
    };

    if (!isAuthenticated) {
        return <div>Please log in to view your todos.</div>;
    }

    return (
        <div>
            <h1>Your to-do list</h1>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={"Add new todo"}
            />
            <button onClick={handleAddTodo}>Add to-do</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                            }}
                            onClick={() => handleToggleTodo(todo.id)}>
                            {todo.text}
                        </span>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todos;