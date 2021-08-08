import { ERRORS_TYPES } from "./errors-types"

export const ShowErrorModal = (dispatch, message)=>{
    dispatch({type: ERRORS_TYPES.SHOW_ERROR_MODAL, payload: message})
}
export const HideErrorModal = (dispatch)=>{
    dispatch({type: ERRORS_TYPES.HIDE_ERROR_MODAL})
}