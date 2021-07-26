import { loginType } from "./login.types";


export const InitState = (dispatch)=>{
    dispatch({type: loginType.SET_INITIAL_STATE})
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