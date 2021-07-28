import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {setCurrentUser, SetCurrentUser} from '../redux/login/login.actions'
import { connect } from 'react-redux';
class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    render() {        
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');
        if(token) {
            console.log(token)
            localStorage.setItem('accessToken', token);
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

}
const mapDispatcToProps={
    SetCurrentUser:(user)=>setCurrentUser(user)
}

export default connect(mapStateToProps,mapDispatcToProps)(OAuth2RedirectHandler)
