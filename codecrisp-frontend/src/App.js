
import './App.css';
import './component/CodeCrisp.css';
import { Provider } from 'react-redux';
import myStore from './Store';
import HomePage from './component/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeUser from './component/HomeUser';
import PrivateRoutes from './component/private-routing/private-routes';
import Jobs from './component/Jobs/Jobs.js';
import setAuthHeader from './utility/set-auth-header';
import jwtDecode from 'jwt-decode';
import { SET_USER } from './Action/Types';
import JobDetails from './component/Jobs/JobDetails';
import Discuss from './component/Discuss/Discuss';
import UserProfileComponent from './component/ProfileComponent/UserProfileComponent';
import ErrorComponent from './component/ErrorComponent/ErrorComponent';
import FriendComponent from './component/friend-component/FriendComponent';
import SettingsComponent from './component/setting-component/SettingsComponent';
import ChangePasswordComponent from './component/setting-component/ChangePassword';
import Postopen from './component/post-component/Postopen';
import socketIO from 'socket.io-client';
import Chat from './component/chat-box-component/Chat';
import DeleteAccount from './component/setting-component/DeleteAccount.js';




/* 
    before App renders we need to check if the user is already logged in(by checking token in localStorage)
    if user is logged in then we SET_USER using redux and component will be rendered accordingly
*/
const token = localStorage.getItem("token");

setAuthHeader(token);

if (token) {
  let user = jwtDecode(token);
  myStore.dispatch({
    type: SET_USER,
    payload: user
  })
}


function App() {


  return (
    <div className="App">

      <Provider store={myStore}>

        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<HomePage />} />
            <Route path='/' element={<PrivateRoutes header={true} component={HomeUser} />} />
            <Route path='/jobs' element={<PrivateRoutes header={true} component={Jobs} />} />
            <Route path='/userProfile/*' element={<PrivateRoutes header={true} component={UserProfileComponent} />} />
            <Route path='/jobs/*' element={<PrivateRoutes header={true} component={JobDetails} />} />
            <Route path='/discuss' element={<PrivateRoutes header={true} component={Discuss} />} />
            <Route path='/friends/*' element={<PrivateRoutes header={true} component={FriendComponent} />} />
            <Route path='/settings' element={<PrivateRoutes header={true} component={SettingsComponent} />} />
            <Route path='/settings/change-password' element={<PrivateRoutes header={true} component={ChangePasswordComponent} />} />
            <Route path='/settings/delete-account' element={<PrivateRoutes header={true} component={DeleteAccount} />} />
            <Route path='/post/*' element={<PrivateRoutes header={true} component={Postopen} />}  />
            <Route path='/chat/*' element={<PrivateRoutes  
          component={Chat}
            />} />
            <Route path='/page-not-found' element={<ErrorComponent/>}/>
            
            
          </Routes >


        </BrowserRouter >


      </Provider >
    </div >
  );
}

export default App;
