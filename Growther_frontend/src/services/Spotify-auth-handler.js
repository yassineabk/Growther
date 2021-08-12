import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {setCurrentUser, SetCurrentUser} from '../redux/login/login.actions'
import { connect } from 'react-redux';
import { registerWithFacebookAndGoogle } from '../redux/registration/registration.action';
import { SetSpotifyToken } from './tokens';
class SpotifyAuthHandler extends Component {
    getUrlParameter(name) {
        var hash = this.props.location.hash
        var regex = new RegExp("(?<=access_token=).+?(?=&)");
        var results = regex.exec(hash);
        return results === null ? '' : results[0];
    };
    render() {        
        const token = this.getUrlParameter('access_token');
        const error = this.getUrlParameter('error');
        if(token) {
            SetSpotifyToken(token, 3600*1000)
        }
        return <Redirect to="/" />
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

export default SpotifyAuthHandler;
