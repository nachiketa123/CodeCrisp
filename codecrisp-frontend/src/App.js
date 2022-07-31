
import './App.css';
import Header from './component/Header';
import AllPosts from './component/post-component/all-posts';
import PostComponent from './component/post-component/post';

function App() {
  return (
    <div className="App">
      <Header />
      <AllPosts/>
    </div>
  );
}

export default App;
