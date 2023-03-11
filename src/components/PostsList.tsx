import { useEffect, memo } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchPosts } from '../redux/actions/postsAction';

const PostsLits = () => {

    const { posts, isLoading, error } = useAppSelector(state => state.postsReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPosts)
    }, [])

    return (
        <>
            {isLoading && <h3>Загрузка...</h3>}
            {error && <h3>{error}</h3>}
            {posts?.map((post, index) => {
                return (
                    <div key = {post.id}>
                        <h3>{post.title}</h3>
                        <h5>{post.body}</h5>
                    </div>
                )
            })}
        </>
    )
}

export default memo(PostsLits)