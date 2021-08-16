import React, { useEffect } from "react"
import { useUser } from 'react-spotify-api';
import { SPOTIFY_CLIENT_ID } from "../../../../services/links";
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import { GetSpotifyToken } from "../../../../services/tokens";
export const SpotifyIframe = ({url, action_done, onError, closeModal})=>{
    const token = GetSpotifyToken()
    var iframeBlur = ()=>{
        var listener = window.addEventListener('blur', event => {
            if (document.activeElement === document.getElementById('spotifyIframe')) {
                setTimeout(()=>{
                    action_done(event, true)
                }, 3000) 
            }
            window.removeEventListener('blur', listener);
        });
    }
    var SpotifyIdMaker = (url)=>{
        while(url[url.length - 1] === "/"){
            url = url.slice(0, url.length - 1)
        }
        url = url.split("/")
        var id = url[url.length - 1]
        return id
    }
    if(token) return(
        <iframe 
            onLoad={()=> iframeBlur()} 
            onError={()=> closeModal()}
            id="spotifyIframe" 
            src={`https://open.spotify.com/embed/track/${SpotifyIdMaker(url)}`} 
            width="300" 
            height="380" 
            frameBorder="0" 
            allowtransparency="true" 
            allow="encrypted-media">
        </iframe>
    )
    return(
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