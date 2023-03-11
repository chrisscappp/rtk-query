import React, { memo, FC } from 'react'
import { ITodo } from '../models/ITodo'

interface TodoItemProps {
    todo: ITodo,
    index: number,
    remove: (post: ITodo) => void,
    update: (post: ITodo) => void
}

const TodoItem: FC<TodoItemProps> = ({todo, index, remove, update}) => {

    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation()
        remove(todo)
    }

    const handleUpdate = (event: React.MouseEvent) => {
        const t = prompt() || ""
        update({...todo, title: t})
    }

    return (
        <>
            <div className = "todo" onClick = {handleUpdate} style = {{cursor: 'pointer'}}>
                {index + 1}. {todo.title}
                <button style = {{marginLeft: '15px'}} onClick = {handleRemove}>Complete</button>
            </div>
        </>
    )
}

export default memo(TodoItem)