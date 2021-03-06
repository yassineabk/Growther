import axios from "axios"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { GetSpotifyToken } from "../../../../services/tokens"
import { SpotifyAuthComponent } from "../spotify-login/spotify-login.compnent"
export const SpotifySave = ({url, action_done, onError})=>{
    var [token, setToken] = useState(GetSpotifyToken())
    var {direction} = useSelector(state => state.userInfos)
    var {t} = useTranslation()
    useEffect(()=>{
        window.addEventListener("storage", event=>{
            if(event.key === "spotifyAccessToken"){
                setToken(event.newValue)
            }
        })
    }, [token])
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
                                    return result
                                }
                            }
                        }
                    })
                }
                return value
            }).catch(err=>{
                return false
            }).then(value =>{
                if(!value){
                    onError()
                }
            })
    }
    if(token) return(
        <div dir={direction ? direction : "ltr"} className="is-flex is-flex-direction-column action-links">
            <div>
                {t("To complete this action, click on save")}:
            </div>
            {active ? <div className="link-container">
                <div onClick={(event)=> Save(event, url)}>{t("save")}</div>
            </div> : null}
        </div>
    )
    return (
        <SpotifyAuthComponent />
    )
}