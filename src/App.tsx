import './App.css';
import UsersList from './components/UsersList';
import PostsList from './components/PostsList';
import TodosList from './components/TodosList'
import CommentsList from './components/CommentsList'

function App() {

  return (
    <div className="App">
        <CommentsList/>
        <hr />
        <UsersList/>
        <hr />
        <PostsList/>
        <hr />
        <TodosList/>
    </div>
  );
}

export default App;
