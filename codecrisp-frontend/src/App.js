
import './App.css';
import './component/CodeCrisp.css';
import ChatBox from './component/chat-box-component/ChatBox';
import Header from './component/Header';
import AllPosts from './component/post-component/all-posts';
import PostBox from './component/post-component/Post-box';
import CommunityNotification from './component/SideComponent';
// import HomePage from './component/HomePage/HomePage';




function App() {
  return (
    <div className="App">


      {/* <HomePage /> */}
      <div className='app-container'>
        {/* <div className='header'> */}
        <Header />
        {/* </div> */}

        <div className='feed-body'>
          <div className='chat-box'>
            <ChatBox />
          </div>
          <div className='all-posts'>
            <PostBox />
            <AllPosts />
          </div>
          <div className='notification-panel'>
            <CommunityNotification />
            {/* {/* Right side notification panel */}
          </div>
        </div>
      </div>

      {/* <Header /> */}
      {/* <CommunityNotification /> */}


    </div>
  );
}

export default App;
