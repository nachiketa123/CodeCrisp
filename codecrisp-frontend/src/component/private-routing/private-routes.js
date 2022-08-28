import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from '../../utility/is-empty';

const PrivateRoutes = ({ component: Component, auth: { isAuthenticated }, errorReducer: {error} }) => {

    if(isAuthenticated){
        if( !isEmpty(error) && !isEmpty(error.pageNotFound) ){
            return (<Navigate to="/page-not-found"/>)
        }
        else{
            return (<Component/>)
        }
        
    }
    else{
        return (<Navigate to="*" />)
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