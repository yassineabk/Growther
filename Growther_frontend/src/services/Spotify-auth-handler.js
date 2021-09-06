import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { SetSpotifyToken } from './tokens';
class SpotifyAuthHandler extends Component {
    getUrlParameter() {
        var hash = this.props.location.hash
        var regex = new RegExp("(?<=access_token=).+?(?=&)");
        var results = regex.exec(hash);
        return results === null ? '' : results[0];
    };
    render() {        
        const token = this.getUrlParameter('access_token');
        if(token) {
            SetSpotifyToken(token, 3600*1000)
        }
        window.close()
        return <Redirect to="/" />
    }
}

export default SpotifyAuthHandler;
