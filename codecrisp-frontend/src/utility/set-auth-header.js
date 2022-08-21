import axios from "axios"

const setAuthHeader = (token) =>{
    if(token){
        //set token if valid token is provided
        axios.defaults.headers.common["Authorization"] = token;
        localStorage.setItem("token",token);
    }else{
        //delete token if token is false
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
    }
}

export default setAuthHeader;