import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {setCurrentUser, SetCurrentUser} from '../redux/login/login.actions'
import { registerWithFacebookAndGoogle } from '../redux/registration/registration.action';
import { SetDiscordBotToken, SetDiscordToken } from './tokens';
import { DISCORD_APP_ID, DISCORD_CLIENT_ID } from './links';
class DiscordBotAuthHandler extends Component {
    async getUrlParameter(name) {
        console.log(this.props.location)
        var search = this.props.location.search
        var regex = new RegExp(("(?<=code=).+.+?(?=&guild)"));
        var results = regex.exec(search);
        return results
    };
    render() {  
        this.getUrlParameter('access_token').then(token =>{
            if(token) {
                SetDiscordBotToken(token, 3600*1000)
            }
        });
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

export default DiscordBotAuthHandler;
