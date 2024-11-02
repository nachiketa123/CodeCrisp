import { GET_ERROR } from "./Types"

export const resetError = () => (dispatch) =>{
    dispatch({
        type:GET_ERROR,
        payload: {}
    })
}