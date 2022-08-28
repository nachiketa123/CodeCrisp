import React,{useEffect, useState} from 'react'
import './Post-box.css'
import { FaFileImage, FaVideo, FaRegStickyNote } from "react-icons/fa";
import FilePreviewComponent from '../common/FilePreviewComponent';
import isEmpty from '../../utility/is-empty';
import { connect } from 'react-redux'
import { addPost } from '../../Action/PostAction';
import PropTypes from 'prop-types';

function PostBox({auth : {user} ,addPost}) {
    const [state, setState] = useState({
        files:[],
        urls:[],
        postText:'',
        location:'',
        name: user.name,
        inputFile:''
    })

    let ignore = false; 
    useEffect(()=>{
       if(ignore === false){
            state.files.map((e)=>{
                const reader = new FileReader();
                reader.onloadend = ()=> {
                    let newUrls = state.urls
                    if(newUrls.indexOf(reader.result === -1)){
                        // console.log('here')
                        newUrls.push(reader.result)
                        setState({
                            ...state,
                            urls: newUrls
                        })
                    }
                    
                }
                reader.readAsDataURL(e);
            })  
        }
        return ()=>{ ignore = true} 
        
    },[state.files])

    const handleOnChange = (e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    const handleImageUpload = (e)=>{
        // console.log(e.target.files)
        setState({
            ...state,
            files:[...e.target.files]
        })
    }

    const handlePost = (e) =>{
        const postData ={
            imageUrls: state.urls,
            postText: state.postText,
            location:state.location,
            name:state.name,
            user:user.id
        }
        addPost(postData)
        setState({
            ...state,
            inputFile:'',
            files:[],
            urls:[],
            postText:''
        })
    }

    return (
        <div className='postBox-outer'>

            <div className='postBox-row1'>
                <div className='profile-photo'>

                    <img
                        className='user-photo'
                        src={user.avatar?user.avatar:require('../../assets/images/nach_profile.jpg')} alt="Profile Photo" />
                </div>
                <div className='postBox-textArea'>

                    <input name='postText' type='text' className='postBox-text' value={state.postText} onChange={handleOnChange} placeholder='Share your Day !' />
                    <button type="button" className="btn btn-primary" onClick={handlePost}
                        style={{ borderRadius: "0.5em" }}>Post</button>


                </div>
            </div>
            {!isEmpty(state.files)? (<FilePreviewComponent files={state.files}/>): ''}
            <div className='postBox-row2'>
                <label htmlFor='upload-photo' className='icons-postbox'>
                    <FaFileImage color='seagreen' className='photo' />Photo
                </label>
                <input name="inputFile" onChange={handleImageUpload} type='file' id='upload-photo'  value={state.inputFile} multiple style={{display:'none'}}  />
                <a className='icons-postbox'><FaVideo color='blue'
                    className='video' />Video</a>
                <a className='icons-postbox'><FaRegStickyNote color='red'
                    className='article' />Write article</a>
            </div>
        </div>

    )
}

PostBox.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postReducer: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    auth: state.authRed,
    postReducer: state.postReducer
})

export default connect(mapStateToProps,{ addPost })(PostBox)
