import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';


const PrivateRoutes = ({ component: Component, auth: { isAuthenticated } }) => {

    if(isAuthenticated){
        return (<Component/>)
    }
    else{
        return (<Navigate to="*" />)
    }
}
 
const mapStateToProps = (state) =>({
    auth: state.authRed
})

export default connect(mapStateToProps)(PrivateRoutes);