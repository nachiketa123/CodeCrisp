import axios from "axios"

export const SendFriendRequest = (user_data) => (dispatch) =>{

    axios.post('/api/friend/sendFriendRequest',user_data)
        .then(res=>{
            console.log('request sent ',res)
        })
        .catch(err=>{
            console.log('Error ',err)
        })
}
