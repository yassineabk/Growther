import React, { useEffect, useState } from "react"
import { GetSpotifyToken } from "../../../../services/tokens";
import { SpotifyAuthComponent } from "../spotify-login/spotify-login.compnent";
export const SpotifyIframe = ({url, action_done, onError})=>{
    var [token, setToken] = useState(GetSpotifyToken())
    useEffect(()=>{
        window.addEventListener("storage", event=>{
            if(event.key === "spotifyAccessToken"){
                setToken(event.newValue)
            }
        })
    }, [token])
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
            title="spotify-iframe"
            onLoad={()=> iframeBlur()} 
            onError={()=> onError()}
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
        <SpotifyAuthComponent />
    )
}