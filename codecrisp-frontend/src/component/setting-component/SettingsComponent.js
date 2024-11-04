import React from 'react';
import { Link } from 'react-router-dom';

const SettingsComponent = () => {
    return ( 
        <div className="d-flex flex-column"style={{padding:'20px'}}>
            <Link to='/settings/change-password'>
                <button className='btn btn-danger'>Change Password</button> 
            </Link> 
            <Link to='/settings/delete-account'>
                <button className='btn btn-danger mt-4'>Delete Account</button>
            </Link>
        </div>
     );
}

 
export default SettingsComponent;