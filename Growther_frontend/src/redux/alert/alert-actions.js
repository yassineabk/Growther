import { ALERT_TYPES } from "./alert-types"

export const SuccessAlert = (dispatch, message)=>{
    var timeout;
    var timeout = setTimeout(() =>{
        HideAlert(dispatch, timeout)
    }, 5000)
    dispatch({type: ALERT_TYPES.SUCCESS_ALERT, payload: {message: message, timeout: timeout}})
}
export const FailAlert = (dispatch, message)=>{
    var timeout;
    timeout = setTimeout(() =>{
        HideAlert(dispatch, timeout)
    }, 5000)
    dispatch({type: ALERT_TYPES.FAIL_ALERT, payload: {message: message, timeout: timeout}})
}
export const HideAlert = (dispatch, timeout)=>{
    dispatch({type: ALERT_TYPES.HIDE_ALERT, payload: timeout})
}