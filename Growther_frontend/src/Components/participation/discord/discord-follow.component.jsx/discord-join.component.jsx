import axios from "axios"
import React, { useState } from "react"
import { DISCORD_AUTH_URL, DISCORD_CLIENT_ID } from "../../../../services/links"
import { GetDiscordToken } from "../../../../services/tokens"
export const DiscordJoin = ({url, action_done, closeModal})=>{
    const token = GetDiscordToken()
    const oauthUrl = DISCORD_AUTH_URL
    var [active, setActive] = useState(true)
    var config = {
        "headers": {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin" : "*",
            "Accept" : "application/json",
            "Content-Type" : "application/json",
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
                axios.put(`https://discord.com/api/guilds/${getGuildId(url)}/members/${data.id}`)
                    .then(res =>{
                        setActive(false)
                        action_done(event, true)
                    })
            }).catch(err =>{
                closeModal()
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
        <a href={oauthUrl}>Discord Auth</a>
    )
}