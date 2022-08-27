
const extractUserIdFromURL = () => {


    const current_url = window.location.href;
    let profile_user_id = current_url.match(/(?:.(?!\/))+$/).toString().substring(1, current_url.length);
    return profile_user_id;

}


export default extractUserIdFromURL