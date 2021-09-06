import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { SetDiscordToken } from './tokens';
import { DISCORD_APP_ID, DISCORD_CLIENT_ID, FRONTEND_API } from './links';
class DiscordAuthHandler extends Component {
    async getUrlParameter() {
        try{
            var search = this.props.location.search
            var regex = new RegExp(("(?<=code=).+"));
            var results = regex.exec(search);
            var redirect_url = process.env.NODE_ENV === "development" ? "http://localhost:3000/discord/redirect" :  `${FRONTEND_API}/discord/redirect`
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
        }catch (err){
            return false
        }
    };
    render() {  
        this.getUrlParameter('access_token').then(token =>{
            if(token) {
                SetDiscordToken(token, 3600*1000)
            }
        });
        window.close()
        return <Redirect to="/" />
    }
}

export default DiscordAuthHandler;
