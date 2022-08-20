
import './App.css';
import './component/CodeCrisp.css';
import { Provider } from 'react-redux';
import myStore from './Store';
import HomePage from './component/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeUser from './component/HomeUser';
import PrivateRoutes from './component/private-routing/private-routes';
import Jobs from './component/Jobs';


function App() {
  return (
    <div className="App">

      <Provider store={myStore}>

        <BrowserRouter>

          <Routes>
            <Route path='*' element={<HomePage />} />
            <Route path='/' element={<PrivateRoutes component={HomeUser} />} />
            <Route path='/jobs' element={<PrivateRoutes component={Jobs} />} />

          </Routes>
        </BrowserRouter>


      </Provider>
    </div >
  );
}

export default App;
