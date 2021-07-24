import { userService } from "../../Services/user-service";
import { authTypes } from "./auth.types";

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

    function request(user) { return { type: authTypes.REGISTER_REQUEST, user } }
    function success(user) { return { type: authTypes.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: authTypes.REGISTER_FAILURE, error } }
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
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: authTypes.LOGIN_REQUEST, user } }
    function success(user) { return { type: authTypes.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: authTypes.LOGIN_FAILURE, error } }
}

export function logout() {
    userService.logout();
    return { type: authTypes.LOGOUT };
}