import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { CloseActionModal } from "../../../redux/contest-card/contest-card-actions"
import { SubmitTextAction } from "../../participation/submit-information/submit-text.component"
import { SubmitUrlAction } from "../../participation/submit-information/submit-url.component"
import { SubscribeToNewsLetter } from "../../participation/subscribe-to-newsletter/subscribe-to-newsletter.component"
import { VisitSocialMedia } from "../../participation/visit-social-media/visit-social-media.component"
export const ActionModal = ({action, valid_answer_check, action_done, valid_url_check})=>{
    var dispatch = useDispatch()
    useEffect(()=>{
        var listener = window.addEventListener('blur', event => {
            if (document.activeElement === document.getElementById('spotifyIframe')) {
                setTimeout(()=>{
                    action_done(event, true)
                }, 3000) 
            }
            window.removeEventListener('blur', listener);
        });
    })
    var LinkMaker = (url)=>{
        while(url[url.length - 1] === "/"){
            url = url.slice(0, url.length - 1)
        }
        url = url.replaceAll(":", "%3A").replaceAll("/", "%2F")
        return url
    }
    var SpotifyIdMaker = (url)=>{
        while(url[url.length - 1] === "/"){
            url = url.slice(0, url.length - 1)
        }
        url = url.split("/")
        var id = url[url.length - 1]
        return id
    }
    if(action === null && typeof(action) !== "object" && action.provider === null && typeof(action.provider) !== "string") return null
    switch(action.provider.toLowerCase()){
        case "facebook":
            switch(action.type.toLowerCase()){
                case "view post":
                    return(
                        <iframe
                            id={"iframe"}
                            onLoad={(event)=> action_done(event, true)}
                            onError={()=> CloseActionModal(dispatch)}
                            src={`https://www.facebook.com/plugins/post.php?href=${action.url !== null && typeof(action.url) === "string" ? LinkMaker(action.url) : ""}&width=750&show_text=true&appId=549723986167815&height=273`}
                            width="750" 
                            height="273" 
                            style={{border:"none !important", overflow:"hidden", borderRadius: 0}} 
                            scrolling="yes" 
                            frameBorder={"0"} 
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                        </iframe>
                    )
                case "visit page":
                    return (
                        <VisitSocialMedia link={action.url} action_done={(event)=> action_done(event, true)} />
                    )
                case "like post":
                    return null
                default:
                    return null
            }
        case "youtube":
            switch(action.type.toLowerCase()){
                case "visit channel":
                    return (
                        <VisitSocialMedia link={action.url} action_done={(event)=> action_done(event, true)} />
                    )
                case "submit url":
                    return (
                        <SubmitUrlAction provider={"youtube"} valid_url_check={(value)=> valid_url_check(value)} />
                    )
                default:
                    return null
            }
        case "instagram":
            switch(action.type.toLowerCase()){
                case "visit page":
                    return(
                        <VisitSocialMedia link={action.url} action_done={(event)=> action_done(event, true)} />
                    )
                case "view post":
                    return (
                        null
                    )
                default:
                    return null
            }
        case "twitter":
            switch(action.type.toLowerCase()){
                case "visit page":
                    return(
                        <VisitSocialMedia link={action.url} action_done={(event)=> action_done(event, true)} />
                    )
                case "follow page":
                    return null
                case "tweet":
                    return null
                case "retweet":
                    return null
                default:
                    return null
            }
        case "twitch":
            switch(action.type.toLowerCase()){
                case "follow":
                case "bonus for twitch subscribers" :
                case "redeem twitch channel points reward":
                default:
                    return null
            }
        case "pinterest":
            switch(action.type.toLowerCase()){
                case "visit page":
                    return(
                        <VisitSocialMedia link={action.url} action_done={(event)=> action_done(event, true)} />
                    )
                case "submit pin":
                case "select board":
                    return null
                default:
                    return null
            }
        case "snapchat":
            switch(action.type.toLowerCase()){
                case "follow":
                    return null
                default:
                    return null
            }
        case "linkedin":
            switch(action.type.toLowerCase()){
                case "share":
                case "follow":
                    return null
                default:
                    return null
            }
        case "tiktok":
            switch(action.type.toLowerCase()){
                case "watch video":
                    return <VisitSocialMedia link={action.url} action_done={(event)=> action_done(event, true)} />
                case "submit video":
                    return  <SubmitUrlAction provider={"tiktok"} valid_url_check={(value)=> valid_url_check(value)} />
                default:
                    return null
            }
        case "blog":
            switch(action.type.toLowerCase()){
                case "view":
                    return(
                        <VisitSocialMedia link={action.url} action_done={(event)=> action_done(event, true)} />
                    )
                case "write a blog post":
                    return(
                        <SubmitUrlAction provider={""} valid_url_check={(value)=> valid_url_check(value)} />
                    )
                case "subscribe to rss feed":
                case "comment on a blog":
                    return null
                default:
                    return null
            }
        case "discord":
            switch(action.type.toLowerCase()){
                case "join server":
                    return null
                default:
                    return null
            }
        case "steam":
            switch(action.type.toLowerCase()){
                case "play for hours":
                case "join":
                    return null
                default:
                    return null
            }
        case "spotify":
            switch(action.type.toLowerCase()){
                case "listen to":
                    return (
                        <iframe id="spotifyIframe" src={`https://open.spotify.com/embed/track/${SpotifyIdMaker(action.url)}`} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media">

                        </iframe>
                    )
                case "save":
                case "follow":
                    return null
                default:
                    return null
            }
        case "soundcloud":
            switch(action.type.toLowerCase()){
                case "listen to":
                case "like":
                case "follow":
                case "repost":
                case "submit":
                    return (
                        <SubmitUrlAction provider={"soundcloud"} valid_url_check={(value)=> valid_url_check(value)} />
                    )
                default:
                    return null
            }
        case "website":
            switch(action.type.toLowerCase()){
                case "visit link":
                    return <VisitSocialMedia link={action.url} action_done={(event)=> action_done(event, true)} />
                default:
                    return null
            }
        case "newsletter":
            switch(action.type.toLowerCase()){
                case "subscribe to newsletter":
                    return (
                        <SubscribeToNewsLetter valid_url_check={(value)=> valid_url_check(value)}  />
                    )
                default:
                    return null
            }
        case "question":
            switch(action.type.toLowerCase()){
                case "answer question":
                    return (
                        <SubmitTextAction valid_answer_check={(value)=> valid_answer_check(value)} text={action.url} />
                    )
                default:
                    return null
            }
        case "coupon":
            switch(action.type.toLowerCase()){
                case "get coupon":
                    return null
                default:
                    return null
            }
        case "bonus":
            switch(action.type.toLowerCase()){
                case "get completion bonus":
                    return null
                default:
                    return null
            }
        default:
            return null
    }
}