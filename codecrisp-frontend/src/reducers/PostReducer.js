import { DELETE_USER_POST, GET_ALL_USER_POST, SET_LOADING_ONN, USER_ADDED_NEW_POST, 
LIKE_POST, ADD_COMMENT , POST_DATA, CONFIRM_EDIT_COMMENT, DELETE_POST_COMMENT, 
RESET_ALL_POST_DATA} from "../Action/Types";
import isEmpty from "../utility/is-empty";

const initialState = {
    allUserPosts: [],
    newPost: {},
    loading: false,
    morePostAvailable:true,
    page:0
}

const PostReducer = (state = initialState, action) => {
    let postId, commentId, newComment,newAllUserPosts, postIndex, newCommentArr,index

    switch (action.type) {
        case USER_ADDED_NEW_POST:
            return {
                ...state,
                newPost: action.payload,
                allUserPosts: [...state.allUserPosts, action.payload],
                loading: false
            }
        case GET_ALL_USER_POST:
            return {
                ...state,
                morePostAvailable: !isEmpty(action.payload.data),
                allUserPosts: [...state.allUserPosts,...action.payload.data],
                loading: false,
                page: !isEmpty(action.payload.data)? action.payload.page: state.page
            }
        case SET_LOADING_ONN:
            return {
                ...state,
                loading: true
            }
        case LIKE_POST:
            index = state.allUserPosts.findIndex(post => post._id === action.payload.post_id);
            if(isEmpty(state.allUserPosts[index].likes))
                state.allUserPosts[index].likes = []
            
            let likeIndex = state.allUserPosts[index].likes.findIndex(user => user.user === action.payload.user_id)
            if(likeIndex === -1)
                state.allUserPosts[index].likes.push({user:action.payload.user_id});
            else
                state.allUserPosts[index].likes.splice(likeIndex,1);
            return {
                ...state,

            }

        case DELETE_USER_POST:
            return {
                ...state,
                allUserPosts: state.allUserPosts.filter(post => post._id !== action.payload)
            }

        case ADD_COMMENT:

            index = state.allUserPosts.findIndex(post => post._id === action.payload.postId);
            if(!state.allUserPosts[index].comments)
                state.allUserPosts[index].comments = []
            state.allUserPosts[index].comments.push(action.payload.newComment);
            return {
                ...state

            }
            
        case POST_DATA:
          return{
            ...state , currentPost:action.payload
          }

        case CONFIRM_EDIT_COMMENT:
          postId = action.payload.postId
          commentId = action.payload.commentId
          newComment = action.payload.newComment
          
          newAllUserPosts = state.allUserPosts
          //Find index of the particular post
          postIndex = newAllUserPosts.findIndex(post=>post._id === postId)
          //extract comment array from the post
          newCommentArr = state.allUserPosts.at(postIndex).comments

          newCommentArr.map(comment=>{
            if(comment.id === commentId)
                comment.text = newComment
          })

          newAllUserPosts[postIndex].comments = newCommentArr 

          return{
            ...state,
            allUserPosts: newAllUserPosts
          }

          case DELETE_POST_COMMENT:
            postId = action.payload.postId
            commentId = action.payload.commentId
            
            newAllUserPosts = state.allUserPosts
            //Find index of the particular post
            postIndex = newAllUserPosts.findIndex(post=>post._id === postId)
            //extract comment array from the post
            newCommentArr = state.allUserPosts.at(postIndex).comments
  
            newAllUserPosts[postIndex].comments = newCommentArr.filter(comment=>comment.id !== commentId)
  
            return{
              ...state,
              allUserPosts: newAllUserPosts
            }
        case RESET_ALL_POST_DATA:
            return{
                ...state,
                allUserPosts: [],
                newPost: {},
                loading: false,
                morePostAvailable:true,
                page:0
            }
        default:
            return state;
    }
}

export default PostReducer;