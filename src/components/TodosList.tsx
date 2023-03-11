import { memo } from 'react'
import { todosAPI } from '../services/TodosService'
import { ITodo } from '../models/ITodo'
import TodoItem from './TodoItem'

const TodosList = () => {

    /* 
    
        У нас есть автосгенерированные хуки, получаемые на основе тех endpoints, 
        которые мы описываем.
    
    */

    const {data: todos, error, isLoading, refetch} = todosAPI.useFetchAllTodosQuery(100) 

    const [createTodo, {}] = todosAPI.useCreateTodoMutation()
    const [updateTodo, {}] = todosAPI.useUpdateTodoMutation()
    const [deleteTodo, {}] = todosAPI.useDeleteMutation()
    // это кортеж. первый элемент - функция, которая вызовет мутацию. второй - сами данные

    // pollingInterval - в определённый промежуток времени получаем данные (чаты, уведомления), типа websocket
    // refetch делает новый запрос, переопределяет данные

    const handleCreateTodo = async () => {
        const t = prompt()
        const data: ITodo = {
            userId: 1,
            title: t,
            completed: false
        }
        await createTodo(data as ITodo) // передать POST объект
    }

    const handleRemove = (todo: ITodo) => {
        deleteTodo(todo)
    }

    const handleUpdate = (todo: ITodo) => {
        updateTodo(todo)
    }

    return (
        <div>
            {isLoading && <h3>Загрузка...</h3>}
            {error && <h3>Ошибка при загрузке</h3>}
            <div className = "todos_list">
                <button onClick = {refetch}>REFETCH</button> 
                <button onClick = {handleCreateTodo}>New todo</button>
                {todos?.map((todo, index) => {
                    return (
                        <>
                            <TodoItem
                                todo = {todo}
                                index = {index}
                                remove = {handleRemove}
                                update = {handleUpdate}
                            />
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default memo(TodosList)