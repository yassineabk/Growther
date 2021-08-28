import React from 'react';
import { Redirect, useLocation } from 'react-router-dom'
import { SetCurrentToken } from '../redux/login/login.actions'
import { useDispatch } from 'react-redux';
import { registerWithFacebookAndGoogle } from '../redux/registration/registration.action';
const OAuth2RedirectHandler = ()=> {
    var dispatch = useDispatch()
    var location = useLocation()
    var getUrlParameter = (name) =>{
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    const token = getUrlParameter('token');
    if(token) {
        localStorage.setItem('accessToken', token);
        var user = localStorage.getItem("user")
        registerWithFacebookAndGoogle(JSON.parse(user))
        SetCurrentToken(dispatch, token)

        return <Redirect to={{
            pathname: "/dashboard",
            
        }}/>; 
    } else {
        return <Redirect to={{
            pathname: "/login",
            
        }}/>; 
    }
}


export default OAuth2RedirectHandler;
