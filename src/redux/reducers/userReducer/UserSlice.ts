import { IUser } from "../../../models/IUser";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { thunkFetchUsers } from "../../actions/userAction";

interface UserState {
    users: IUser[],
    isLoading: boolean,
    error: string,
    count: number
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: '',
    count: 0
} // ОБЯЗАТЕЛЬНОЕ НАЗВАНИЕ 

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }, // внутри поля reducer создаём функции, которые меняют состояние

    extraReducers: {
        [thunkFetchUsers.pending.type]: (state) => {
            state.isLoading = true;
        },
        [thunkFetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false;
            state.users = action.payload
            state.error = ''
        },
        [thunkFetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    } // как пример использования extraReducers
        
}) // из слайса можем вытащить отдельно reducer и отдельно actioncreator. slice создаёт actioncreator

// extraReducers сам определяет типы action, которые надо использовать и что-то делает
// fullfield - всё ок. rejected - ошибка. pending -ждём

export default userSlice.reducer