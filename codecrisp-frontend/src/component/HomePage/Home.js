import React from 'react'
import Login from './Login'
import './Home.css'

function Home() {
    return (
        <div className='background-homePage'>
            <div className='homePage-left'>
                <h1
                >Developer's Social Media !!</h1>
            </div>
            <div className='homePage-left'>
                <Login />
            </div>


        </div>
    )
}

export default Home
