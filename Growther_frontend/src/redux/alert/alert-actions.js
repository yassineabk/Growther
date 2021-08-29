import { ALERT_TYPES } from "./alert-types"

export const SuccessAlert = (dispatch, message)=>{
    dispatch({type: ALERT_TYPES.SUCCESS_ALERT, payload: message})
    setTimeout(() =>{
        HideAlert(dispatch)
    }, 5000)
}
export const FailAlert = (dispatch, message)=>{
    dispatch({type: ALERT_TYPES.FAIL_ALERT, payload: message})
    setTimeout(() =>{
        HideAlert(dispatch)
    }, 5000)
}
export const HideAlert = (dispatch)=>{
    dispatch({type: ALERT_TYPES.HIDE_ALERT})
}