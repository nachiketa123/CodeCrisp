
import './App.css';
import './component/CodeCrisp.css';
import { Provider } from 'react-redux';
import myStore from './Store';
import HomePage from './component/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeUser from './component/HomeUser';
import PrivateRoutes from './component/private-routing/private-routes';
import Jobs from './component/Jobs/Jobs.js';
import Header from './component/Header';
import setAuthHeader from './utility/set-auth-header';
import jwtDecode from 'jwt-decode';
import { SET_USER } from './Action/Types';
import JobDetails from './component/Jobs/JobDetails';
import Discuss from './component/Discuss/Discuss';
import UserProfileComponent from './component/ProfileComponent/UserProfileComponent';
import ErrorComponent from './component/ErrorComponent/ErrorComponent';


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
            <Route path='*' element={<HomePage />} />
            <Route path='/' element={<PrivateRoutes component={HomeUser} />} />
            <Route path='/jobs' element={<PrivateRoutes component={Jobs} />} />
            <Route path='/userProfile/*' element={<PrivateRoutes component={UserProfileComponent} />} />
            <Route path='/jobs/*' element={<PrivateRoutes component={JobDetails} />} />
            <Route path='/discuss' element={<PrivateRoutes component={Discuss} />} />
            <Route path='/page-not-found' element={<ErrorComponent/>} />

          </Routes>


        </BrowserRouter>


      </Provider>
    </div >
  );
}

export default App;
