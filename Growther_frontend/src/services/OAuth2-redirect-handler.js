import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {setCurrentUser, SetCurrentUser} from '../redux/login/login.actions'
import { connect } from 'react-redux';
import { registerWithFacebookAndGoogle } from '../redux/registration/registration.action';
class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    render() {        
        const token = this.getUrlParameter('token');
        // console.log(token);
        const error = this.getUrlParameter('error');
        if(token) {
            localStorage.setItem('accessToken', token);
            var user = localStorage.getItem("user")
            this.props.registerWithFacebookAndGoogle(JSON.parse(user))
            setCurrentUser(token)
            
            return <Redirect to={{
                pathname: "/dashboard",
                
            }}/>; 
        } else {
            return <Redirect to={{
                pathname: "/login",
                
            }}/>; 
        }
    }
}

const mapStateToProps=(state)=>{
    return({
        individual:state.registration.individual,
        brand:state.registration.brand,
        isBrand:state.registration.isBrand,

    })

}
const mapDispatcToProps={
    SetCurrentUser:(user)=>setCurrentUser(user),
    registerWithFacebookAndGoogle:registerWithFacebookAndGoogle
}

export default connect(mapStateToProps,mapDispatcToProps)(OAuth2RedirectHandler)
