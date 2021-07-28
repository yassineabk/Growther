import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
<<<<<<< HEAD
=======
import {setCurrentUser, SetCurrentUser} from '../redux/login/login.actions'
import { connect } from 'react-redux';
>>>>>>> 6f6833c16a8a88fb20ce718dfd4423936596105a
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
<<<<<<< HEAD
            localStorage.setItem('accessToken', token);
            return <Redirect to={{
=======
            console.log(token)
            localStorage.setItem('accessToken', token);
            setCurrentUser(token)
            return <Redirect to={{
                pathname: "/dashboard",
                
>>>>>>> 6f6833c16a8a88fb20ce718dfd4423936596105a
            }}/>; 
        } else {
            return <Redirect to={{
                pathname: "/login",
<<<<<<< HEAD
                state: { 
                }
=======
                
>>>>>>> 6f6833c16a8a88fb20ce718dfd4423936596105a
            }}/>; 
        }
    }
}
<<<<<<< HEAD
=======

const mapStateToProps=(state)=>{

}
const mapDispatcToProps={
    SetCurrentUser:(user)=>setCurrentUser(user)
}

export default connect(mapStateToProps,mapDispatcToProps)(OAuth2RedirectHandler)
>>>>>>> 6f6833c16a8a88fb20ce718dfd4423936596105a
