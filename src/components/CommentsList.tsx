import { memo } from 'react'
import { commentsAPI } from '../services/CommentsService'
import { IComment } from '../models/IComment'
import CommentItem from './CommentItem'

type CastError = {
    status: number,
    data: object
}

const CommentsList = () => {

    const {data: comments, error, isLoading} = commentsAPI.useFetchAllCommentsQuery(100)
    const userEmail = "chrisscappp@mail.ru"
    
    const [createComment, {}] = commentsAPI.useCreateCommentMutation()
    const [updateComment, {}] = commentsAPI.useUpdateCommentMutation()
    const [deleteComment, {}] = commentsAPI.useDeleteCommentMutation()

    const handleCreateComment = async () => {
        const t = prompt()
        const data: IComment = {
            postId: 1,
            name: "Boboa",
            email: userEmail,
            body: t
        }
        await createComment(data as IComment)
    }

    const handleUpdateComment = (comment: IComment) => {
        updateComment(comment)
    }

    const handleDeleteComment = (comment: IComment) => {
        deleteComment(comment)
    }

    const err = error as CastError

    return (
        <>
            <div>
                {error && <h3>Error with status code {err.status}</h3>}
                {isLoading && <h3>Загрузка...</h3>}
                {comments?.map((item, index) => {
                    return (
                        <>
                            <CommentItem
                                comment = {item}
                                index = {index}
                                update = {handleUpdateComment}
                                remove = {handleDeleteComment}
                                userEmail = {userEmail}
                            />
                        </>
                    )
                })}
                <button onClick = {handleCreateComment}>Добавить коммент</button>
            </div>
        </>
    )
}

export default memo(CommentsList)