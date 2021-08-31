import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
export const ActionIcon = ({provider})=>{
    var {direction} = useSelector(state => state.userInfos)
    if(typeof(provider) !== "string") return null
    switch(provider.toLowerCase()){
        case "youtube":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/youtube.png").default} />
                </div>
            )
        case "facebook":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/facebook.png").default} />
                </div>
            )
        case "instagram":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/instagram.png").default} />
                </div>
            )
        case "twitter":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/twitter.png").default} />
                </div>
            )
        case "twitch":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/twitch.png").default} />
                </div>
            )
        case "pinterest":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/pinterest.png").default} />
                </div>
            )
        case "snapchat":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/snapchat.png").default} />
                </div>
            )
        case "linkedin":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/linkedin.png").default} />
                </div>
            )
        case "tiktok":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/tiktok.png").default} />
                </div>
            )
        case "blog":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/blog.png").default} />
                </div>
            )
        case "discord":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/discord.png").default} />
                </div>
            )
        case "steam":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/steam.png").default} />
                </div>
            )
        case "spotify":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/spotify.png").default} />
                </div>
            )
        case "soundcloud":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/soundcloud.png").default} />
                </div>
            )
        case "website":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/website.png").default} />
                </div>
            )
        case "newsletter":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/newsletter.png").default} />
                </div>
            )
        case "question":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/question.png").default} />
                </div>
            )
        case "coupon":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/coupon.png").default} />
                </div>
            )
        case "bonus":
            return(
                <div dir={direction ? direction : "ltr"} className="actionIcon">
                    <img alt="" src={require("../../../assets/icons/bonus.png").default} />
                </div>
            )
        default:
            return null
    }
}