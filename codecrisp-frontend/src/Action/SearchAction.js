import axios from "axios";
import { SEARCH_RESULT, GET_ERROR } from "./Types";

export const searchResult = (userFind) => (dispatch) => {

    axios.get('/api/user/searchuser', userFind).then(
        res => {
            dispatch({ type: SEARCH_RESULT, payload: res.data })
        }
    ).catch(
        err => {
            dispatch({ type: GET_ERROR, payload: err.response.data })
        }
    )
}