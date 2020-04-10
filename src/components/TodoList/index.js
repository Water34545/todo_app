import React from 'react'
import TodoListItem from '../TodoListItem'
import './style.css'

const TodoList = ({todos,onDelited, onToggleImportant, onToggleDone}) => {

    const elements = todos.map((item) => {
        const {id, ...itemProps} = item
        return (
            <li key={id} className="list-group-item">
                <TodoListItem 
                {...itemProps} 
                onDelited={() => onDelited(id)}
                onToggleImportant={()=>onToggleImportant(id)}
                onToggleDone={()=>onToggleDone(id)}
                />
            </li>
        )
    })

    return (
        <ul className="list-group todo-list">{elements}</ul>
    )
}

export default TodoList