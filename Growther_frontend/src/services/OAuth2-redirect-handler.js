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
            console.log(token)
            localStorage.setItem('accessToken', token);
            setCurrentUser(token)
            if(this.props.isBrand){
                const user={
                  name:this.props.brand.name,
                  url:this.props.brand.url,
                  activities:this.props.brand.activities,
    
                  isBrand:"true"
    
                }
                
                console.log(user)
                this.props.registerWithEmailAndPassword(user)
              }else{
                const user={
                  name:this.props.individual.name,
                  isBrand:"false"
                }
                this.props.registerWithFacebookAndGoogle(user)
              }

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
