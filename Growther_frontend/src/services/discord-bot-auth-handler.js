import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { SetDiscordBotToken } from './tokens';
class DiscordBotAuthHandler extends Component {
    async getUrlParameter() {
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

export default DiscordBotAuthHandler;
