import React,{ useState, useEffect} from 'react';
import './FriendNavigatorComponent.css';
import { FiUsers, FiUserPlus, FiUserCheck } from 'react-icons/fi'
import { IoIosArrowForward } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom';
import getClassNames from '../../utility/getClassNames';


const navigations = ['see-all-friends','see-all-friend-requests','see-all-friend-suggestion']

const FriendNavigatorComponent = () => {

    const location = useLocation();
    const navigate = useNavigate();


    const [active, setActive] = useState(navigations[0])

    useEffect(()=>{
        let path = location.pathname.toString().split('/').pop()
        console.log(path)
        setActive(path)
    },[location])

    const handleNavigatorClick = (path)=>{
        navigate('/friends/'+path)
    }

    return ( 
        <div className='friend-navigator-container'>
            <h2 className="navigator-heading">Friends</h2>
            <div className="selector-div-container">
                <div onClick={evnt=>handleNavigatorClick(navigations[0])} className="selector-div">
                    <div className='selector-div-left-part'>
                        <FiUsers className={getClassNames({dc:'all-friends-icon',cc:'active'},active === navigations[0])}/> 
                        <label className={getClassNames({dc:'selector-div-text',cc:'active'},active === navigations[0])}>All Friends</label>
                    </div>
                    <IoIosArrowForward className={getClassNames({dc:'selector-div-right-part',cc:'active'},active === navigations[0])}/>
                </div>
                    
                    
                <div onClick={evnt=>handleNavigatorClick(navigations[1])} className="selector-div">
                    <div className='selector-div-left-part'>
                        <FiUserPlus className={getClassNames({dc:'friend-request-icon',cc:'active'},active === navigations[1])}/>
                        <label className={getClassNames({dc:'selector-div-text',cc:'active'},active === navigations[1])} >Friend Requests</label>
                    </div>
                    <IoIosArrowForward className={getClassNames({dc:'selector-div-right-part',cc:'active'},active === navigations[1])}/>
                </div>

                <div onClick={evnt=>handleNavigatorClick(navigations[2])} className="selector-div">
                    <div className='selector-div-left-part'>
                        <FiUserCheck className={getClassNames({dc:'friends-suggestion-icon',cc:'active'},active === navigations[2])}/>
                        <label className={getClassNames({dc:'selector-div-text',cc:'active'},active === navigations[2])}>Friend Suggestion</label>
                    </div>
                    <IoIosArrowForward className={getClassNames({dc:'selector-div-right-part',cc:'active'},active === navigations[2])}/>
                </div>
            
            </div> 
        </div>
    );
}
 
export default FriendNavigatorComponent;