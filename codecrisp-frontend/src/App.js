
import './App.css';
import ChatBox from './component/chat-box-component/ChatBox';
import Header from './component/Header';
import AllPosts from './component/post-component/all-posts';

function App() {
  return (
    <div className="App">
      <div className='app-container'>
        <div className='header'>
          <Header />
        </div>
        <div className='feed-body'>
          <ChatBox />
          <AllPosts/>
          
        </div>
      </div>
      
      
    </div>
  );
}

export default App;
