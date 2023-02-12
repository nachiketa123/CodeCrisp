import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from '../../utility/is-empty';
import Header from '../Header';
import myStore from '../../Store';
import { SET_SOCKET } from '../../Action/Types';
import { io } from 'socket.io-client';

//initializing socket
let socket; 
try{
socket = io()
}catch(err){
    console.error('Error occurred while initializing socket',err)
}

const PrivateRoutes = ({ header, component: Component, auth: { isAuthenticated }, errorReducer: { error } }) => {
    let ignore = false;

    useEffect(() => {

        if (!ignore) {

            // socket.on('connect',()=>{
            myStore.dispatch({
                type: SET_SOCKET,
                payload: socket
            })
            // })
            // console.log('init',socket.id)

            try{
                socket.on('server_conn', (msg) => {
                    console.log(msg)
                })
            }catch(err){
                console.error('Socket error occurred while connecting to server',err)
            }
            

        }

        return () => {
            ignore = true;
            try{
                socket.off('connect');
                socket.off('disconnect');
                socket.off('pong');
            }catch(err){
                console.error('Error occurred while resetting the socket connection', err)
            }
        }
    }, [])


    if (isAuthenticated) {
        if (!isEmpty(error) && !isEmpty(error.pageNotFound)) {
            return (<Navigate to="/page-not-found" />)
        }
        else {
            return (
                <React.Fragment>
                    {header ? (<div className='header'>
                        <Header />
                    </div>) : ''}
                    <Component />
                </React.Fragment>
            )
        }

    }
    else {
        return (<Navigate to="/*" />)
    }
}

PrivateRoutes.propTypes = {
    auth: PropTypes.object.isRequired,
    errorReducer: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.authRed,
    errorReducer: state.errorReducer
})

export default connect(mapStateToProps)(PrivateRoutes);