
import './App.css';
import './component/CodeCrisp.css';
import { Provider } from 'react-redux';
import myStore from './Store';
import HomePage from './component/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeUser from './component/HomeUser';




function App() {
  return (
    <div className="App">



      <Provider store={myStore}>

        <BrowserRouter>

          <Routes>
            <Route path='*' element={<HomePage />} />
            <Route path='/authUser' element={<HomeUser />} />


          </Routes>
        </BrowserRouter>


      </Provider>
    </div >
  );
}

export default App;
