import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IComment } from "../models/IComment";

export const commentsAPI = createApi({
    reducerPath: 'commentsAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
    tagTypes: ['Comment'],
    endpoints: (build) => ({
        fetchAllComments: build.query<IComment[], number>({
            query: (limit = 10) => ({
                url: '/comments',
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ['Comment']
        }),
        createComment: build.mutation<IComment, IComment>({
            query: (comment) => ({
                url: '/comments',
                method: 'POST',
                body: comment
            }),
            invalidatesTags: ['Comment'] 
        }),
        updateComment: build.mutation<IComment, IComment>({
            query: (comment) => ({
                url: `/comments/${comment.id}`,
                method: 'PUT',
                body: comment
            }),
            invalidatesTags: ['Comment']
        }),
        deleteComment: build.mutation<IComment, IComment>({
            query: (comment) => ({
                url: `/comments/${comment.id}`,
                method: 'DELETE',
                body: comment
            }),
            invalidatesTags: ['Comment']
        })
    })
})