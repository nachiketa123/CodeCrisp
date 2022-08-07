import React from 'react'
import Header from '../Header'
import HeaderHome from './HeaderHome'
import './HomePage.css'
import Login from './Login'
import Signup from './Signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './Footer'
import Developer from './Developer'





function HomePage() {
    return (
        <div className='background-homepage'>
            <BrowserRouter>

                <HeaderHome />

                <Routes>

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/developers" element={<Developer />} />

                </Routes>

                <Footer />

            </BrowserRouter>
        </div>
    )
}

export default HomePage