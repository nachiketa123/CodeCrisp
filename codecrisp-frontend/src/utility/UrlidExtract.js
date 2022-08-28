
const extractUserIdFromURL = () => {
    return new Promise((resolve,reject)=>{
        try{
            const current_url = window.location.href;
            let profile_user_id = current_url.match(/(?:.(?!\/))+$/).toString().substring(1, current_url.length);
            resolve (profile_user_id);
        }catch(err){
            reject(err)
        }
    })
    

}
export default extractUserIdFromURL