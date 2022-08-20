import React from 'react'
import Header from '../Header'
import HeaderHome from './HeaderHome'
import './HomePage.css'
import Login from './Login'
import Signup from './Signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './Footer'
import Developer from './Developer'
import Home from './Home'





function HomePage() {
    return (
        <div className='background-homepage'>


            <HeaderHome />

            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/developers" element={<Developer />} />
            </Routes>


            <Footer />


        </div>
    )
}

export default HomePage