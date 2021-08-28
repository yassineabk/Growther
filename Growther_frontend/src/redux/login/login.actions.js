import { userService } from "../../services/user-service";
import { ALERT_TYPES } from "../alert/alert-types";
import { ShowErrorModal } from "../errors/errors-actions";
import { RESET_ALL_TYPE } from "../reset-all/reset-all-type";
import { setUserInfosFail } from "../user-infos/user-infos-actions";
import { loginType } from "./login.types";


export const InitState = (dispatch)=>{
    dispatch({type: loginType.SET_INITIAL_STATE})
}
export const setCurrentUser=(user)=>{ 
    return ({ type: loginType.LOGIN_SUCCESS, payload: user })
}
export const setCurrentToken = (token)=>{
    return ({type: loginType.SET_CURRENT_TOKEN, payload: token})
}
export const SetCurrentToken = (dispatch, token)=>{
    dispatch({type: loginType.SET_CURRENT_TOKEN, payload: token})
}
export const setEmail =(email) =>{
    return ({type: loginType.SET_EMAIL ,payload:email})
}

export const setPassword =(password) =>{
    return ({type: loginType.SET_PASSWORD ,payload:password})
}

export const setLoginError =(bool) =>{
    return ({type: loginType.SET_LOGIN_ERROR ,payload:bool})
}

export const setLoginErrorMessage =(message) =>{
    return ({type: loginType.SET_LOGIN_ERROR_MESSAGE ,payload:message})
}

export const setRemember =(bool) =>{
    return ({type: loginType.SET_REMEMBER_ME ,payload:bool})
}


export function loginWithEmailAndPassword(user) {
    return dispatch => {
        dispatch(request({ user }));

        userService.loginWithEmailAndPassword(user)
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    ShowErrorModal(dispatch, "Something went wrong, please try again later")
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: loginType.LOGIN_REQUEST, payload: user } }
    function success(user) { return { type: loginType.LOGIN_SUCCESS, payload: user } }
    function failure(error) { return { type: loginType.SET_LOGIN_ERROR_MESSAGE, payload: error } }
}

export async function logout(dispatch) {
    userService.logout().then(()=>{
        setUserInfosFail(dispatch)
        dispatch({ type: loginType.LOGOUT })
        dispatch({ type: RESET_ALL_TYPE.RESET_ALL })
        return { type: loginType.LOGOUT };
    }).catch(err =>{
        return false
    }).then(value =>{
        if(value){
            dispatch({ type: ALERT_TYPES.SUCCESS_ALERT, payload: "Logged Out Successfully" })
        }else{
            dispatch({type: ALERT_TYPES.SUCCESS_ALERT, payload: "Log Out Failure"})
        }
    });
    
}