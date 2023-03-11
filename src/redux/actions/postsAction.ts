import { AppDispatch } from "../../store/store";
import axios from 'axios'
import { IPost } from '../../models/IPost'
import { postsSlice } from '../reducers/postsReducer/PostSlice'

export const fetchPosts = async (dispatch: AppDispatch) => {
    try {
        dispatch(postsSlice.actions.postsFetching())
        const response = await axios.get<IPost[]>(`https://jsonplaceholder.typicode.com/posts`, {
            params: {
                _limit: 5
            }
        })
        dispatch(postsSlice.actions.postsFetchingSuccess(response.data))
    } catch (e: unknown) {
        const err = e as Error;
        dispatch(postsSlice.actions.postsFetchingFailed(err.message))
    }
}