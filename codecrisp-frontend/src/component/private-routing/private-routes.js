import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from '../../utility/is-empty';
import Header from '../Header';

const PrivateRoutes = ({ header, component: Component, auth: { isAuthenticated }, errorReducer: {error} }) => {

    if(isAuthenticated){
        if( !isEmpty(error) && !isEmpty(error.pageNotFound) ){
            return (<Navigate to="/page-not-found"/>)
        }
        else{
            return (
                <React.Fragment>
                    {header?(<div className='header'>
                                <Header />
                        </div>):''} 
                    <Component/>
                </React.Fragment>
      )
        }
        
    }
    else{
        return (<Navigate to="/*" />)
    }
}

PrivateRoutes.propTypes = {
    auth: PropTypes.object.isRequired,
    errorReducer: PropTypes.object.isRequired
}
 
const mapStateToProps = (state) =>({
    auth: state.authRed,
    errorReducer: state.errorReducer
})

export default connect(mapStateToProps)(PrivateRoutes);