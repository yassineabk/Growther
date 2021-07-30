import axios from "axios";

const USERS_REST_API_URL = 'http://localhost:5000';

export const userService = {
    loginWithEmailAndPassword,
    loginWithFacebookAndGoogle,
    logout,
    registerWithEmailAndPassword,
};

function loginWithFacebookAndGoogle(user){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${USERS_REST_API_URL}/authentication/login`, requestOptions)
            .then(response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('user', JSON.stringify(user));
            console.log("updating info when login with fb and google")
        });
}


function loginWithEmailAndPassword(user) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${USERS_REST_API_URL}/authentication/login`, requestOptions)
        .then(handleResponse)
        .then(token => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem("accessToken",token.accessToken);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('accessToken');
}




function registerWithEmailAndPassword(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    console.log(JSON.stringify(user))

    return fetch(`${USERS_REST_API_URL}/authentication/signup`, requestOptions)
    .then(handleResponse)
    .then(user => {
        return user;
    });
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log(data)
        return data;
    });
}

