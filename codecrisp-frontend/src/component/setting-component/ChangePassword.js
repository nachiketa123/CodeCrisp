import React, { useState } from 'react';
import './ChangePassword.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const ChangePasswordComponent = ({ authReds: { user } }) => {

    const navigate = useNavigate();

    const [state, setState] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    const handleOnChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (state.newPassword !== state.confirmNewPassword) {
            alert('New password does not match confirm password')
        } else {
            const obj = {
                oldPassword: state.oldPassword,
                newPassword: state.newPassword,
                user_id: user.id
            }
            axios.post('/api/user/change-password', obj)
                .then(res => {
                    alert(res.data)
                    navigate('/')
                })
                .catch(err => {
                    alert(err.response.data.invalidPassword)
                })
        }
    }

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <label className='label-password-change'>Old password </label>
            <input onChange={handleOnChange} name='oldPassword' className='change-password' placeholder='Old password' type="password" />
            <label className='label-password-change'>New password </label>
            <input onChange={handleOnChange} name='newPassword' className='change-password' placeholder='new password' type="password" />
            <label className='label-password-change'>Confirm new password </label>
            <input onChange={handleOnChange} name='confirmNewPassword' className='change-password' placeholder='confirm new password' type="password" />

            <button onClick={handleSubmit} className='btn btn-primary'>Submit</button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    authReds: state.authRed
})

export default connect(mapStateToProps, {})(ChangePasswordComponent);