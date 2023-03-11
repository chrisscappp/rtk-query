import React, { memo, FC } from 'react'
import { IComment } from '../models/IComment'

interface CommentItemProps {
    comment: IComment,
    index: number,
    update: (comment: IComment) => void,
    remove: (comment: IComment) => void,
    userEmail: string
}

const CommentItem: FC<CommentItemProps> = ({comment, index, update, remove, userEmail}) => {

    console.log(userEmail);
    
    const handleUpdate = () => {
        const t = prompt() || ""
        update({...comment, body: t})
    }

    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation()
        remove(comment)
    }

    return (
        <div>
            <h4>
                {index + 1}. {comment.email}
            </h4>
            <h5>
                {comment.body}
            </h5>
            {
                comment.email === userEmail
            ?
                <>
                    <button onClick = {handleUpdate}>Редактировать</button>
                    <button onClick = {handleRemove}>Удалить</button>
                </>
            :
                null
            }
            
        </div>
    )
}

export default memo(CommentItem)