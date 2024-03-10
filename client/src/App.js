import './App.css';
import CreatePost from './CreatePost/CreatePost.jsx';
import PostList from './Post_list.jsx';

function App() {
  return (
    <div className="App">
        <PostList></PostList>
        <CreatePost/>
    </div>
  );
}

export default App;