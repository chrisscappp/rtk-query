import { AppDispatch } from "../../store/store";
import axios from 'axios'
import { IUser } from '../../models/IUser'
import { userSlice } from "../reducers/userReducer/UserSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// чтобы пользоваться функционалом RTK, action вернёт нам другую функцию, которая
// параметром принимает dispatch. и уже из этой функции производим асинхронные действия

/*

export const fetchUsers = async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.usersFetching())
        const response = await axios.get<IUser[]>(`https://jsonplaceholder.typicode.com/users`)
        dispatch(userSlice.actions.usersFetchingSuccess(response.data))
    } catch (e: unknown) {
        const err = e as Error;
        dispatch(userSlice.actions.usersFetchingFailed(err.message))
    }
} // диспатчим каждый action. это база

*/

export const thunkFetchUsers = createAsyncThunk(
    'user/fetchAll',
    async(_, thunkApi) => {
        try {
            const response = await axios.get<IUser[]>(`https://jsonplaceholder.typicode.com/users`)
            return response.data;
        } catch (e: unknown) {
            const err = e as Error
            return thunkApi.rejectWithValue(err.message);
        }
    }
) // надстройка которая сделает асинхронность и диспатч за нас. 
  //первый арг - название, тип. второй - сам колбэк
