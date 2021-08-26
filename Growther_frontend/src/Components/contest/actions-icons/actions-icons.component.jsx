import React from "react"
export const ActionIcon = ({provider})=>{
    if(typeof(provider) !== "string") return null
    switch(provider.toLowerCase()){
        case "youtube":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/youtube.png").default} />
                </div>
            )
        case "facebook":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/facebook.png").default} />
                </div>
            )
        case "instagram":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/instagram.png").default} />
                </div>
            )
        case "twitter":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/twitter.png").default} />
                </div>
            )
        case "twitch":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/twitch.png").default} />
                </div>
            )
        case "pinterest":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/pinterest.png").default} />
                </div>
            )
        case "snapchat":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/snapchat.png").default} />
                </div>
            )
        case "linkedin":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/linkedin.png").default} />
                </div>
            )
        case "tiktok":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/tiktok.png").default} />
                </div>
            )
        case "blog":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/blog.png").default} />
                </div>
            )
        case "discord":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/discord.png").default} />
                </div>
            )
        case "steam":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/steam.png").default} />
                </div>
            )
        case "spotify":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/spotify.png").default} />
                </div>
            )
        case "soundcloud":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/soundcloud.png").default} />
                </div>
            )
        case "website":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/website.png").default} />
                </div>
            )
        case "newsletter":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/newsletter.png").default} />
                </div>
            )
        case "question":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/question.png").default} />
                </div>
            )
        case "coupon":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/coupon.png").default} />
                </div>
            )
        case "bonus":
            return(
                <div className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/bonus.png").default} />
                </div>
            )
        default:
            return null
    }
}