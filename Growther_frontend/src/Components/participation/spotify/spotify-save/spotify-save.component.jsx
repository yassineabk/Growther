import axios from "axios"
import React, { useState } from "react"
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import { SPOTIFY_CLIENT_ID } from "../../../../services/links"
import { GetSpotifyToken } from "../../../../services/tokens"
export const SpotifySave = ({url, action_done})=>{
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
        var Spotify_Url = url.toLowerCase().includes("album") || url.toLowerCase().includes("albums") ? "https://api.spotify.com/v1/me/albums" : "https://api.spotify.com/v1/me/tracks"
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
        const id = AlbumId(url)
        axios.put(`${Spotify_Url}?ids=${id}`, [] ,config)
            .then(response =>{
                setActive(false)
                return true
            }).then(value =>{
                if(value){
                    axios.get(Spotify_Url, config2).then(response =>{
                        var {data} =  response
                        if(data !== null && typeof(data) === "object"){
                            var {items} = data
                            if(Array.isArray(items)){
                                var result = false
                                for(var i = 0; i < items.length; i++){
                                    if(items[i].album.id === id){
                                        result = true
                                        break
                                    }
                                }
                                if(result){
                                    action_done(event, true)
                                }
                            }
                        }
                    })
                }
            }).catch(err=>{
                return false
            })
    }
    if(token) return(
        <div className="is-flex is-flex-direction-column action-links">
            <div>
                To complete this action, click on save:
            </div>
            {active ? <div className="link-container">
                <div onClick={(event)=> Save(event, url)}>Save</div>
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