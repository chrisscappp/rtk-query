import { IPost } from '../../../models/IPost'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface PostState {
    posts: IPost[],
    error: string,
    isLoading: boolean
}

const initialState: PostState  = {
    posts: [],
    error: '',
    isLoading: false
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postsFetching(state) {
            state.isLoading = true
        },
        postsFetchingSuccess(state, action: PayloadAction<IPost[]>) {
            state.isLoading = false
            state.posts = action.payload
            state.error = ''
        },
        postsFetchingFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export default postsSlice.reducer