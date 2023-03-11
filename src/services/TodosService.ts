import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { ITodo } from '../models/ITodo'

export const todosAPI = createApi({
    reducerPath: 'todosAPI', // уникальный ключ
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}), 
    tagTypes: ['Todo'],
    endpoints: (build) => ({
        /*2 аргумент generick - тип ожидаемого параметра*/
        fetchAllTodos: build.query<ITodo[], number>({
            query: (limit: number = 5) => ({
                url: '/todos',
                params: {
                    _limit: limit
                }
            }), // функция, возвращает объект. принимает аргументы для запроса
            providesTags: result => ['Todo'] // чтобы RTK знал, куда какие данные слать
            // тэг обеспечивает поставку данных
        }),
        createTodo: build.mutation<ITodo, ITodo>({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todo'] // указали, что данные стали неактуальны => надо из заново получить
        }),
        updateTodo: build.mutation<ITodo, ITodo>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: ['Todo'] // указали, что данные стали неактуальны => надо из заново получить
        }),
        delete: build.mutation<ITodo, ITodo>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'DELETE',
                body: todo
            }),
            invalidatesTags: ['Todo'] // указали, что данные стали неактуальны => надо из заново получить
        })
    }) // здесь будут изменятся данные. написали методы здесь
})

// query - получить данные. mutation - изменить

/*
    Мы описали некоторый endpoint, некоторый url, указали какие у него будут параметры
    какого типа запрос... RTK Query для нас сам сгенерировал хук, с помощью которого
    мы можем получить какие-то данные. Часть нагрузки RTK берёт на себя.
    Запросы при получении и генерации данных не дублируются!!! RTK кеширует данные
    и своевременно обновляет, при необходимости. 
*/