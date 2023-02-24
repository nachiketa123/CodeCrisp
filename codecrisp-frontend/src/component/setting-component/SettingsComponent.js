import React from 'react';
import { Link } from 'react-router-dom';

const SettingsComponent = () => {
    return ( 
        <div style={{padding:'20px'}}>
            <Link to='/settings/change-password'>
                <button className='btn btn-danger'>Change Password</button> 
            </Link> 
        </div>
     );
}

 
export default SettingsComponent;