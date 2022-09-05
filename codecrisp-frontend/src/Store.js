import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/RootReducer';
import jwt_decode from 'jwt-decode';
import { LOGOUT_USER, SET_USER } from './Action/Types';
import setAuthHeader from './utility/set-auth-header';

const initial = {};



const myStore = createStore(rootReducer
    , initial
    , compose(applyMiddleware(thunk)
        , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    ))

let currentState = myStore.getState();



/* 
  Dispatch action to set the user 
*/

myStore.subscribe(() => {
    let prevState = currentState;
    currentState = myStore.getState();

    //check if the token is expired if yes then logout
    let token = currentState.authRed.token;
    if(token){
        let user = jwt_decode(token);
        if(user.exp*1000 < new Date().getTime()){
            myStore.dispatch({
                type: LOGOUT_USER,
                payload:{}
            })
        }
    }
    //only check when token is changed 
    if (prevState.authRed.token !== currentState.authRed.token) {

        let token = currentState.authRed.token;
        //if token is set then set the user i.e. login

        //TODO: set header in axios as bearer token for private APIs
        setAuthHeader(token);
        if (token) {
            let user = jwt_decode(token);
            myStore.dispatch({
                type: SET_USER,
                payload: user
            })
        }
    }

    // delete token when isAuthenticated is changed to false
    if (prevState.authRed.isAuthenticated === true && currentState.authRed.isAuthenticated === false) {
        setAuthHeader(false);

    }
})
export default myStore;