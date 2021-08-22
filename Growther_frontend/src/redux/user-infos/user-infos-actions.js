import { UserInfosTypes } from "./user-infos-types"

export const setUserInfos = (dispatch, infos)=>{
    dispatch({ type: UserInfosTypes.SET_USER_INFOS, payload: infos })
}
export const setUserInfosFail = (dispatch)=>{
    dispatch({type: UserInfosTypes.SET_USER_INFOS_FAIL})
}