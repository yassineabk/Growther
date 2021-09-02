import { userService } from "../../services/user-service";
import { ShowErrorModal } from "../errors/errors-actions";
import { registrationType } from "./registration.types";


export const InitState = (dispatch)=>{
    dispatch({type: registrationType.SET_INITIAL_STATE})
}

export const SetEmail =(email) =>{
    return ({type: registrationType.SET_EMAIL ,payload:email})
}

export const SetPassword =(password) =>{
    return ({type: registrationType.SET_PASSWORD ,payload:password})
}

export const SetConfirmationPassword =(password) =>{
    return ({type: registrationType.SET_CONFIRMATION_PASSWORD ,payload:password})
}

export const SetEmailError =(bool) =>{
    return ({type: registrationType.SET_EMAIL_ERROR ,payload:bool})
}

export const SetEmailErrorMessage =(message) =>{
    return ({type: registrationType.SET_EMAIL_ERROR_MESSAGE ,payload:message})
}

export const SetPasswordError =(bool) =>{
    return ({type: registrationType.SET_PASSWORD_ERROR ,payload:bool})
}

export const SetPasswordErrorMessage =(message) =>{
    return ({type: registrationType.SET_PASSWORD_ERROR_MESSAGE ,payload:message})
}

export const SetPasswordConfirmationError =(bool) =>{
    return ({type: registrationType.SET_PASSWORD_CONFIRMATION_ERROR ,payload:bool})
}

export const SetPasswordConfirmationErrorMessage =(message) =>{
    return ({type: registrationType.SET_PASSWORD_CONFIRMATION_ERROR_MESSAGE ,payload:message})
}

export const SetUserType =(bool) =>{
    return ({type: registrationType.SET_USER_TYPE ,payload:bool})
}

export const ToogleSecondStep =(bool) =>{
    return ({type: registrationType.TOGGLE_SECOND_STEP ,payload:bool})
}

export const ToogleThirddStep =(bool) =>{
    return ({type: registrationType.TOGGLE_THIRD_STEP ,payload:bool})
}

export const setBrandName =(name) =>{
    return ({type: registrationType.SET_BRAND_NAME ,payload:name})
}

export const setBrandNameError =(bool) =>{
    return ({type: registrationType.SET_BRAND_NAME_ERROR ,payload:bool})
}
export const setBrandNameErrorMessage =(message) =>{
    return ({type: registrationType.SET_BRAND_NAME_ERROR_MESSAGE ,payload:message})
}

export const setBrandUrl =(url) =>{
    return ({type: registrationType.SET_BRAND_URL ,payload:url})
}

export const setBrandUrlError =(bool) =>{
    return ({type: registrationType.SET_BRAND_URL_ERROR ,payload:bool})
}
export const setBrandUrlErrorMessage =(message) =>{
    return ({type: registrationType.SET_BRAND_URL_ERROR_MESSAGE ,payload:message})
}


export const setBrandActvity =(activity) =>{
    return ({type: registrationType.SET_BRAND_ACTIVITY ,payload:activity})
}

export const setBrandActvityError =(bool) =>{
    return ({type: registrationType.SET_BRAND_ACTIVITY_ERROR ,payload:bool})
}
export const setBrandActvityErrorMessage =(message) =>{
    return ({type: registrationType.SET_BRAND_ACTIVITY_ERROR_MESSAGE,payload:message})
}

export const setIndividualName =(name) =>{
    return ({type: registrationType.SET_INDIVIDUAL_NAME ,payload:name})
}

export const setIndividualNameError =(bool) =>{
    return ({type: registrationType.SET_INDIVIDUAL_NAME_ERROR ,payload:bool})
}
export const setIndividualNameErrorMessage =(message) =>{
    return ({type: registrationType.SET_INDIVIDUAL_NAME_ERROR_MESSAGE ,payload:message})
}
export const setRegistrationError=(bool)=>{
    return({type:registrationType.SET_REGISTRATION_ERROR,payload:bool})
}

export const setRegistrationErrorMessage=(message)=>{
    return({type:registrationType.SET_REGISTRATION_ERROR_MESSAGE,payload:message})
}

export function registerWithEmailAndPassword(user) {
    return dispatch => {
        dispatch(request(user));

        userService.registerWithEmailAndPassword(user)
            .then(
                user => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));

                }
            );
    };

    function request(user) { return { type: registrationType.REGISTER_REQUEST, payload:user } }
    function success(user) { return { type: registrationType.REGISTER_SUCCESS, payload: user } }
    function failure(error) { return { type: registrationType.SET_REGISTRATION_ERROR_MESSAGE, payload:error } }

}

export function registerWithFacebookAndGoogle(user, dispatch) {
    dispatch(request(user));
    userService.loginWithFacebookAndGoogle(user)
        .then(
            user => { 
                dispatch(success());
            },
            
        ).catch(error =>{
            ShowErrorModal(dispatch, "Something went wrong, please try again later")
            dispatch(failure(error.toString()));
        });

    function request(user) { return { type: registrationType.REGISTER_REQUEST, payload: user } }
    function success(user) { return { type: registrationType.REGISTER_SUCCESS, payload: user } }
    function failure(error) { return { type: registrationType.SET_REGISTRATION_ERROR_MESSAGE, payload: error } }

}