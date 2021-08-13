import axios from "axios"
import React, { useState } from "react"
import { BACKEND_API, DISCORD_AUTH_URL, DISCORD_CLIENT_ID } from "../../../../services/links"
import { GetDiscordToken } from "../../../../services/tokens"
export const DiscordJoin = ({url, action_done, closeModal})=>{
    const token = GetDiscordToken()
    const oauthUrl = DISCORD_AUTH_URL
    var [active, setActive] = useState(true)
    const config = {
        "headers": {
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
                return response
            }).catch(err =>{
                closeModal(event)
                return false
            }).then(data =>{
                setActive(false)
                action_done(event, true)
                /*axios.put(`https://discord.com/api/guilds/${getGuildId(url)}/members/${data.id}`)
                    .then(res =>{
                        setActive(false)
                        action_done(event, true)
                    })*/
            })
    }
    if(token){
        console.log("here")
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
            <div id="discordAuthButton" className="is-flex">
                <span>
                    <img src={require("../../../../assets/icons/discord.png").default} />
                </span>
                <span>
                    <a href={oauthUrl}>Discord Auth</a>
                </span>
            </div>
        </div>
    )
}