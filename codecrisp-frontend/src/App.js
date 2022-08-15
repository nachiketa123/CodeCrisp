
import './App.css';
import './component/CodeCrisp.css';
import ChatBox from './component/chat-box-component/ChatBox';
import Header from './component/Header';
import AllPosts from './component/post-component/all-posts';
import PostBox from './component/post-component/Post-box';
import CommunityNotification from './component/SideComponent';
import NotificationMobile from './component/NotificationMobile';
import { Provider } from 'react-redux';
import myStore from './Store';
// import HomePage from './component/HomePage/HomePage';
import Signup from './component/HomePage/Signup';



function App() {
  return (
    <div className="App">



      <Provider store={myStore}>
        {/* <Signup /> */}
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
              {/* <NotificationMobile /> */}
              {/* {/* Right side notification panel */}
            </div>
          </div>
        </div>

      </Provider>
    </div>
  );
}

export default App;
