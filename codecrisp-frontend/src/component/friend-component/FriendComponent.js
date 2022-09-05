import React,{ useEffect } from 'react'
import FriendDetailsComponent from './FriendDetailsComponent';
import FriendNavigatorComponent from './FriendNavigatorComponent';
import './FriendComponent.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';


function FriendComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(location.pathname.toString()+'/see-all-friends')
        navigate(location.pathname.toString()+'/see-all-friends')
    },[])

    return (
        <div className="friend-container-div">
            <div className='friend-navigator-div'>
                <FriendNavigatorComponent/>
            </div>
            <Routes>
                <Route path='/see-all-friends' element={ <FriendDetailsComponent/> }/>
                <Route path='/see-all-friend-requests' element={ <FriendDetailsComponent/> }/>
                <Route path='/see-all-friend-suggestion' element={ <FriendDetailsComponent/> }/>
            </Routes>
            
            
        </div>
    )
}

export default FriendComponent;
