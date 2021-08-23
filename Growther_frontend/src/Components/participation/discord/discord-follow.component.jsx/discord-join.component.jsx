import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { BACKEND_API, DISCORD_AUTH_URL, DISCORD_BOT_TOKEN, DISCORD_CLIENT_ID } from "../../../../services/links"
import { GetDiscordToken } from "../../../../services/tokens"
export const DiscordJoin = ({url, action_done, closeModal})=>{
    //var token = GetDiscordToken()
    const oauthUrl = DISCORD_AUTH_URL
    var history = useHistory()
    var [active, setActive] = useState(true)
    var [token, setToken] = useState(GetDiscordToken())
    useEffect(()=>{
        window.addEventListener("storage", event=>{
            if(event.key === "discordAccessToken"){
                setToken(event.newValue)
            }
        })
    }, [setToken])
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
                            console.log(res.data)
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
                {active ? <div className="link-container">
                    <div onClick={(event)=> Follow(event, url)}>Join Guild</div>
                </div> : null}
            </div>
        )
    }
    return(
        <div id="discordAuthContainer">
            <div onClick={()=> window.open(oauthUrl, "_blank")} id="discordAuthButton" className="is-flex">
                <span>
                    <img src={require("../../../../assets/icons/discord.png").default} />
                </span>
                <span>
                    Discord Auth
                </span>
            </div>
        </div>
    )
}