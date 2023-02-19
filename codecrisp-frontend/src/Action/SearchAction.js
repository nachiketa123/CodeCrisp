import axios from "axios";
import { SEARCH_RESULT, GET_ERROR } from "./Types";
let cancel = null
export const searchResult = (userFind) => (dispatch) => {

    if(cancel){
        cancel()
    }
    const source = axios.CancelToken.source()
    cancel = source.cancel
    setTimeout(()=>{
        axios.get('/api/searchuser', { params: { searchText: userFind.searchText }, cancelToken: source.token }).then(
            res => {
                console.log('searching..')
                dispatch({ type: SEARCH_RESULT, payload: res.data })
            }
        ).catch(
            err => {
                if(axios.isCancel(err)){
                    //Ignore
                }
                else{
                    dispatch({ type: GET_ERROR, payload: err.response.data })
                }
                
            }
        )
    },500)
}
    