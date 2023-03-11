import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/reducers/userReducer/UserSlice'
import postsReducer from '../redux/reducers/postsReducer/PostSlice'
import { todosAPI } from '../services/TodosService'
import { commentsAPI } from '../services/CommentsService'

const rootReducer = combineReducers({
    userReducer,
    postsReducer,
    [todosAPI.reducerPath]: todosAPI.reducer,
    [commentsAPI.reducerPath]: commentsAPI.reducer,
}) 

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat([
                todosAPI.middleware,
                commentsAPI.middleware
            ])
         // получим default middleware которые лежат в RTK. добавляем middleware из todosapi
    })
} // функция кофигурации хранилища. аля createStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

/*
    Что даёт RTK?
    1. Не надо подключать middleware, redux-thunk и redux dev tools, 
        тк всё это есть в RTK.
    2. Чистый Redux - иммутабельный подход, где reducer - это чистая функция, которая ...
        ...каждый раз возвращает какое-либо состояние объекта. В RTK наоборот...
        ...мы можем взять и изменить конкретное поле у состояния. Библиотека immerJS...
        ...которая идёт под капотом у RTK. Также state объекта мы можем менять...
        ...через state.object.key = action.payload
    3. RTK сам создаёт action-creators и типы для них. Нам нужно лишь вытащить данные
*/