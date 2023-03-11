import { useEffect, memo } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { thunkFetchUsers } from '../redux/actions/userAction';

const UsersList = () => {

    const { users, isLoading, error } = useAppSelector(state => state.userReducer) // получили actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(thunkFetchUsers)
    }, [])

    return (
        <>
            {isLoading && <h3>Загрузка...</h3>}
            {error && <h3>{error}</h3>}
            {users?.map((user, index) => {
                return (
                    <div key = {user.id}>
                        {index + 1}. {user.name} | {user.email}
                    </div>
                )
            })}
        </>
    )
}

export default memo(UsersList)