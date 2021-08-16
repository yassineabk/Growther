import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {setCurrentUser, SetCurrentUser} from '../redux/login/login.actions'
import { connect } from 'react-redux';
import { registerWithFacebookAndGoogle } from '../redux/registration/registration.action';
import { SetDiscordToken } from './tokens';
import axios from 'axios';
import { DISCORD_APP_ID, DISCORD_CLIENT_ID } from './links';
class DiscordAuthHandler extends Component {
    async getUrlParameter(name) {
        var search = this.props.location.search
        var regex = new RegExp(("(?<=code=).+.+?(?=&guild)"));
        var results = regex.exec(search);
        var redirect_url = "http://localhost:3000/discord/redirect"
        console.log(results[0])
        var params = new URLSearchParams()
        params.append('client_id', DISCORD_APP_ID)
        params.append('client_secret', DISCORD_CLIENT_ID)
        params.append('grant_type', 'authorization_code')
        params.append('code', results[0])
        params.append('redirect_uri', redirect_url)
        var headers = {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
        var config = {
            'method' : "POST",
            "headers" : headers,
            "body" : params
        }
        return fetch("https://discord.com/api/v8/oauth2/token", config)
            .then(response =>{
                return response.json()
            }).catch(err =>{
                return false
            }).then(data =>{
                return data.access_token
            })
    };
    render() {  
        this.getUrlParameter('access_token').then(token =>{
            console.log(token)
            if(token) {
                SetDiscordToken(token, 3600*1000)
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

export default DiscordAuthHandler;
