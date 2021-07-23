import axios from "axios";

const USERS_REST_API_URL = 'http://localhost:8080/api/users';

export const userService = {
    loginWithEmailAndPassword,
    loginWithFacebook,
    loginWithGoogle,
    logout,
    registerWithEmailAndPassword,
};

function loginWithFacebook(){

}

function loginWithGoogle(){

}

function loginWithEmailAndPassword(mail, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail, password })
    };

    return fetch(`${USERS_REST_API_URL}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}




function registerWithEmailAndPassword(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${USERS_REST_API_URL}/users/register`, requestOptions).then(handleResponse);
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}