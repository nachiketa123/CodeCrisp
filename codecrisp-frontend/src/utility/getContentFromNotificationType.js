let content = ''
const getContentFromNotificationType = (type) =>{
    switch(type){
        case 'post_like':
            content = 'liked your post'
            return content;
        default:
            return content
    }
}

export default getContentFromNotificationType;