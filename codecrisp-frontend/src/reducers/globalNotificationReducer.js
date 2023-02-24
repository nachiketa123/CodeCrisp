const { GLOBAL_NOTIFICATION } = require("../Action/Types")


const initialState ={
     globalNotification:[]
}


const globalNotificationReducer = (state = initialState , action) =>{

    switch(action.type){
        case GLOBAL_NOTIFICATION:
        
              return{
                   
                   ...state , 
                   globalNotification:action.payload
              
              }
        
       default:
       { return state}
    }
       
}

export default globalNotificationReducer;