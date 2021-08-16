import axios from "axios"
import React, { useState } from "react"
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import { SPOTIFY_CLIENT_ID } from "../../../../../services/links"
import { GetSpotifyToken } from "../../../../../services/tokens"
export const SpotifyFollowPlaylist = ({url, action_done})=>{
    const token = GetSpotifyToken()
    var [active, setActive] = useState(true)
    var AlbumId = (url)=>{
        while(url[url.length - 1] === "/"){
            url = url.slice(0, url.length - 1)
        }
        url = url.split("/")
        url = url[url.length - 1]
        return url
    }
    var Save = (event, url)=>{
        if(!active) return false
        const id = AlbumId(url)
        var Spotify_Url = `https://api.spotify.com/v1/playlists/${id}/followers`
        var config = {
            Method: "PUT",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
        }
        var config2 = {
            Method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
        }
        var body = {
            "public": false
        }
        axios.put(`${Spotify_Url}`, body, config)
            .then(response =>{
                return true
            }).catch(err=>{
                return false
            }).then(value =>{
                if(value){
                    setActive(false)
                    action_done(event, true)
                }
            })
    }
    if(token) return(
        <div className="is-flex is-flex-direction-column action-links">
            <div>
                To complete this action, click on follow:
            </div>
            {active ? <div className="link-container">
                <div onClick={(event)=> Save(event, url)}>Follow Playlist</div>
            </div> : null}
        </div>
    )
    return (
        <div id="spotifyIframe" className="is-flex is-justify-content-center is-align-items-center">
            <SpotifyAuth 
                btnClassName={"spotifyAuthButton"}
                logoClassName={"spotifyAuthLogo"}
                redirectUri={"http://localhost:3000/spotify/redirect"}
                clientID={SPOTIFY_CLIENT_ID}
                title={"Login with spotify"}
                onAccessToken={(token)=> console.log(token)}
                scopes={Object.keys(Scopes).map(key=>{
                    return Scopes[key]
                })}
                localStorage={true}
                noCookie={true}
                showDialog={true}
            />
        </div>
    )
}