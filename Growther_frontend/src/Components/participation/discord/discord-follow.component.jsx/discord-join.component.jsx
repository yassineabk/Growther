import axios from "axios"
import React, { useEffect, useState } from "react"
import { DISCORD_AUTH_URL } from "../../../../services/links"
import { GetDiscordToken } from "../../../../services/tokens"
export const DiscordJoin = ({url, action_done, closeModal})=>{
    //var token = GetDiscordToken()
    const oauthUrl = DISCORD_AUTH_URL
    var [token, setToken] = useState(GetDiscordToken())
    useEffect(()=>{
        window.addEventListener("storage", event=>{
            if(event.key === "discordAccessToken"){
                setToken(event.newValue)
            }
        })
    }, [token])
    const config = {
        "headers": {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Authorization" : `Bearer ${token}`
        },
    }
    var getGuildId = (url)=>{
        while(url[url.length-1] === "/"){
            url = url.slice(0, url.length-1)
        }
        url = url.split("/")
        var id = url[url.length - 2]
        return id
    }
    var Follow = (event, url)=>{
        axios.get("https://discord.com/api/users/@me", config)
            .then(response =>{
                return response.data
            }).then(data =>{
                if(data){
                    axios.get(`https://discord.com/api/guilds/${getGuildId(url)}/members/search`, config)
                        .then(res =>{
                        })
                }else{
                    closeModal(event)
                }
            }).catch(err =>{
                closeModal(event)
                return false
            })
    }
    if(token){
        return(
            <div className="is-flex is-flex-direction-column action-links">
                <div>
                    To complete this action, click on Join Guild:
                </div>
                <div className="link-container">
                    <div onClick={(event)=> Follow(event, url)}>Join Guild</div>
                </div>
            </div>
        )
    }
    return(
        <div id="discordAuthContainer">
            <div onClick={()=> window.open(oauthUrl, "_blank")} id="discordAuthButton" className="is-flex">
                <span>
                    <img alt="" src={require("../../../../assets/icons/discord.png").default} />
                </span>
                <span>
                    Discord Auth
                </span>
            </div>
        </div>
    )
}