import { userService } from "../../services/user-service";
import { loginType } from "./login.types";


export const InitState = (dispatch)=>{
    dispatch({type: loginType.SET_INITIAL_STATE})
}

export const setCurrentUser=(user)=>{ 
    return ({ type: loginType.LOGIN_SUCCESS, payload: user })
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
    console.log("clicked"+user)
    return dispatch => {
        dispatch(request({ user }));

        userService.loginWithEmailAndPassword(user)
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: loginType.LOGIN_REQUEST, payload: user } }
    function success(user) { return { type: loginType.LOGIN_SUCCESS, payload: user } }
    function failure(error) { return { type: loginType.SET_LOGIN_ERROR_MESSAGE, payload: error } }
}

export async function logout() {
    console.log('logout clicked')
    userService.logout();
    return { type: loginType.LOGOUT };
}