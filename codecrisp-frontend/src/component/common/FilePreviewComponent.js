import React,{useEffect, useState} from 'react';
import './FilePreviewComponent.css';
import isEmpty from '../../utility/is-empty';

const FilePreviewComponent = ({files}) => {

    const [state, setState] = useState({
        urls:[]
    });
    let ignore = false; 
    useEffect(()=>{
       if(ignore === false){
            console.log('rendering')
            files.map((e)=>{
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
        
    },[files])

    return ( 
        <div className="preview-container">
            {state.urls.map(e=>(
                        <div key={e} className="preview-one">
                            <img className="preview-img" src={e}/>
                        </div>
                        
                    ))
            }
        </div>
     );
}
 
export default FilePreviewComponent;