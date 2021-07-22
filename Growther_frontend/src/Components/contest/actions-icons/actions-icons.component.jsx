import React from "react"
export const ActionIcon = ({provider})=>{
    if(typeof(provider) !== "string") return null
    switch(provider.toLowerCase()){
        case "youtube":
            return(
                <div className="actionIcon">
                    <img src={require("../../../assets/icons/youtube.png").default} />
                </div>
            )
        case "facebook":
            return(
                <div className="actionIcon">
                    <img src={require("../../../assets/icons/facebook.png").default} />
                </div>
            )
        case "instagram":
            return(
                <div className="actionIcon">
                    <img src={require("../../../assets/icons/instagram.png").default} />
                </div>
            )
        case "twitter":
            return(
                <div className="actionIcon">
                    <img src={require("../../../assets/icons/twitter.png").default} />
                </div>
            )
        case "twitch":
            return(
                <div className="actionIcon">
                    <img src={require("../../../assets/icons/twitch.png").default} />
                </div>
            )
        case "pinterest":
            return(
                <div className="actionIcon">
                    <img src={require("../../../assets/icons/pinterest.png").default} />
                </div>
            )
        default:
            return null
    }
}