import axios from "axios"
import { decode } from "jsonwebtoken"
import { BACKEND_API } from "../../services/links"
import { FailAlert, SuccessAlert } from "../alert/alert-actions"
import { RESET_ALL_TYPE } from "../reset-all/reset-all-type"
import { UserInfosTypes } from "./user-infos-types"

export const setUserInfos = (dispatch, token, infos, tokenChanged)=>{
    var decodedToken = decode(token && token !== null && typeof(token) === "string" ? token.trim() : token)
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        } 
    }
    dispatch({type: UserInfosTypes.IS_LOADING_USER_INFOS})
    if(decodedToken !== null && typeof(decodedToken) === "object"){
        var sub = decodedToken.sub
        if(!infos || infos === null || typeof(infos) !== "object" || infos.id !== parseInt(sub) || tokenChanged){
            return axios.get(`${BACKEND_API}/api/users/${sub}`, config)
            .then(response =>{
                dispatch({ type: UserInfosTypes.SET_USER_INFOS, payload: response.data })
                SuccessAlert(dispatch, "get_infos_successfully")
            }).catch(err => {
                dispatch({type: UserInfosTypes.SET_USER_INFOS_FAIL})
                FailAlert(dispatch, "get_infos_failure")
            })
        }
        FailAlert(dispatch, "get_infos_failure")
        return dispatch({type: UserInfosTypes.SET_USER_INFOS_FAIL})
    }
    localStorage.removeItem("accessToken")
    dispatch({type: RESET_ALL_TYPE.RESET_ALL})
    FailAlert(dispatch, "get_infos_failure")
    return dispatch({type: UserInfosTypes.SET_USER_INFOS_FAIL})
}
export const EditUserInfos = (dispatch, key, value)=>{
    dispatch({type: UserInfosTypes.IS_LOADING_USER_INFOS})
    dispatch({type: UserInfosTypes.EDIT_USER_INFOS, payload: {key, value}})
}
export const setUserInfosFail = (dispatch)=>{
    dispatch({type: UserInfosTypes.SET_USER_INFOS_FAIL})
}