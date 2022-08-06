
import './App.css';
import ChatBox from './component/chat-box-component/ChatBox';
import Header from './component/Header';
import HomePage from './component/HomePage/HomePage';
import AllPosts from './component/post-component/all-posts';

function App() {
  return (
    <div className="App">

      <HomePage />

      <div className='app-container'>
        <div className='header'>
          {/* <Header /> */}
        </div>
        <div className='feed-body'>
          <div className='chat-box'>
            {/* <ChatBox /> */}
          </div>
          <div className='all-posts'>
            {/* <AllPosts/> */}
          </div>
          <div className='notification-panel'>
            {/* Right side notification panel */}
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
