import axios from "axios"
import { decode } from "jsonwebtoken"
import { BACKEND_API } from "../../services/links"
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
            axios.get(`${BACKEND_API}/api/users/${sub}`, config)
            .then(response =>{
                dispatch({ type: UserInfosTypes.SET_USER_INFOS, payload: response.data })
            }).catch(err => {
                dispatch({type: UserInfosTypes.SET_USER_INFOS_FAIL})
            })
        }
    }
    dispatch({type: UserInfosTypes.SET_USER_INFOS_FAIL})
}
export const EditUserInfos = (dispatch, key, value)=>{
    dispatch({type: UserInfosTypes.IS_LOADING_USER_INFOS})
    dispatch({type: UserInfosTypes.EDIT_USER_INFOS, payload: {key, value}})
}
export const setUserInfosFail = (dispatch)=>{
    dispatch({type: UserInfosTypes.SET_USER_INFOS_FAIL})
}