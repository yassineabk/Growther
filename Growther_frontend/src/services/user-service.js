import { decode } from "jsonwebtoken";
import { BACKEND_API, FRONTEND_API } from "./links";

const USERS_REST_API_URL = BACKEND_API;

export const userService = {
    loginWithEmailAndPassword,
    loginWithFacebookAndGoogle,
    logout,
    registerWithEmailAndPassword,
};

function loginWithFacebookAndGoogle(user){
    let token = localStorage.getItem("accessToken");
    let decodedToken = decode(token);
    let id = decodedToken.sub
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer '+token 
        },
        body: JSON.stringify(user)
    };
    console.log("success");
    return fetch(`${USERS_REST_API_URL}/api/users/update/${id}`, requestOptions)
            .then(response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('user', JSON.stringify(user));
        }).catch(error => {});
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
            if(typeof(token.accessToken) === "string" && token.accessToken.toLocaleLowerCase() === "you need to verify your email first"){
                return {...user, needVerifcation: true}
            }else{
                localStorage.setItem("accessToken", token.accessToken);
                return user;
            }
        }).catch(err=>{
            return false
        });
}

async function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('accessToken');
}




function registerWithEmailAndPassword(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch(`${USERS_REST_API_URL}/authentication/signup`, requestOptions)
    .then(handleResponse)
    .then(user => {
        return user;
    }).catch(err =>{
        return false
    });
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout()
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

