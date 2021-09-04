import axios from "axios"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { GetSpotifyToken } from "../../../../../services/tokens"
import { SpotifyAuthComponent } from "../../spotify-login/spotify-login.compnent"
export const SpotifyFollowPlaylist = ({url, action_done})=>{
    var [token, setToken] = useState(GetSpotifyToken())
    var [active, setActive] = useState(true)
    var {direction} = useSelector(state => state.userInfos)
    var {t} = useTranslation()
    useEffect(()=>{
        window.addEventListener("storage", event=>{
            if(event.key === "spotifyAccessToken"){
                setToken(event.newValue)
            }
        })
    }, [token])
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
        <div dir={direction ? direction : "ltr"} className="is-flex is-flex-direction-column action-links">
            <div>
                {t("To complete this action, click on follow")}:
            </div>
            {active ? <div className="link-container">
                <div onClick={(event)=> Save(event, url)}>{t("Follow Playlist")}</div>
            </div> : null}
        </div>
    )
    return (
        <SpotifyAuthComponent />
    )
}