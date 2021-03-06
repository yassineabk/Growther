import React from "react"
import { SpotifyFollowArtist } from "../../participation/spotify/spotify-follow/spotify-follow-artist/spotify-follow-artist.component"
import { SpotifyFollowPlaylist } from "../../participation/spotify/spotify-follow/spotify-follow-playlist/spotify-follow-playlist.component"
import { SpotifyIframe } from "../../participation/spotify/spotify-iframe/spotify-iframe.component"
import { SpotifySave } from "../../participation/spotify/spotify-save/spotify-save.component"
import { SubmitTextAction } from "../../participation/submit-information/submit-text.component"
import { SubmitUrlAction } from "../../participation/submit-information/submit-url.component"
import { SubscribeToNewsLetter } from "../../participation/subscribe-to-newsletter/subscribe-to-newsletter.component"
import { TiktokWatchVideo } from "../../participation/tiktok/tiktok-watch-video.component"
import { DiscordJoin } from "../../participation/discord/discord-follow.component.jsx/discord-join.component"
import { VisitSocialMedia } from "../../participation/visit-social-media/visit-social-media.component"
import { FacebookViewPost } from "../../participation/facebook/facebook-view-post.component"
import { SnapchatFollow } from "../../participation/snapchat/snapchat-follow.component"
import { TwitterFollow } from "../../participation/twitter/follow-twitter-page/follow-twitter-page.component"
import { TwitterTweet } from "../../participation/twitter/tweet/tweet.component"
export const ActionModal = ({action, valid_answer_check, action_done, valid_url_check, closeModal, handleError})=>{
    if(action === null && typeof(action) !== "object" && action.provider === null && typeof(action.provider) !== "string") return null
    switch(action.provider.toLowerCase()){
        case "facebook":
            switch(action.type.toLowerCase()){
                case "view post":
                    return(
                        <FacebookViewPost 
                            action_done={(event, value)=> action_done(event, value)}
                            closeModal={()=> closeModal()}
                            url={action.url}
                        />
                    )
                case "visit page":
                    return (
                        <VisitSocialMedia 
                            link={action.url} 
                            action_done={(event)=> action_done(event, true)} 
                        />
                    )
                case "like post":
                    return null
                default:
                    return null
            }
        case "youtube":
            switch(action.type.toLowerCase()){
                case "watch video":
                case "visit channel":
                    return (
                        <VisitSocialMedia 
                            link={action.url} 
                            action_done={(event)=> action_done(event, true)} 
                        />
                    )
                case "submit url":
                    return (
                        <SubmitUrlAction 
                            provider={"youtube"} 
                            valid_url_check={(value)=> valid_url_check(value)} 
                            id={action.id}
                            index={action.index}
                        />
                    )
                default:
                    return null
            }
        case "instagram":
            switch(action.type.toLowerCase()){
                case "visit page":
                case "view post":
                    return(
                        <VisitSocialMedia 
                            link={action.url} 
                            action_done={(event)=> action_done(event, true)} 
                        />
                    )
                case "follow":
                    // return (
                    //     <InstagramFollow 
                    //         url={action.url} 
                    //         valid_url_check={(value)=> valid_url_check(value)} 
                    //         closeModal={(event)=> closeModal(event)}
                    //         id={action.id}
                    //         index={action.index}
                    //     />
                    // )
                    return null
                default:
                    return null
            }
        case "twitter":
            switch(action.type.toLowerCase()){
                case "visit page":
                case "view tweet":
                    return(
                        <VisitSocialMedia 
                            link={action.url} 
                            action_done={(event)=> action_done(event, true)} 
                        />
                    )
                case "tweet":
                    return (
                        <TwitterTweet 
                            url={action.url} 
                            valid_url_check={(value)=> valid_url_check(value)} 
                            closeModal={(event)=> closeModal(event)}
                            id={action.id}
                            index={action.index}
                        />
                    )
                case "retweet":
                case "follow":
                    return (
                        <TwitterFollow
                            url={action.url} 
                            valid_url_check={(value)=> valid_url_check(value)} 
                            closeModal={(event)=> closeModal(event)}
                            id={action.id}
                            index={action.index}
                        />
                    )
                default:
                    return null
            }
        case "snapchat":
            switch(action.type.toLowerCase()){
                case "follow":
                    return (
                        <SnapchatFollow 
                            url={action.url} 
                            valid_url_check={(value)=> valid_url_check(value)} 
                            closeModal={(event)=> closeModal(event)}
                            id={action.id}
                            index={action.index}
                        />
                    )
                default:
                    return null
            }
        case "tiktok":
            switch(action.type.toLowerCase()){
                case "watch video":
                    return(
                        <TiktokWatchVideo
                            url={action.url}
                            closeModal={event => closeModal(event)}
                            action_done={(event, value)=> action_done(event, value)}
                        />
                    )
                case "submit video":
                    return ( 
                        <SubmitUrlAction 
                            provider={"tiktok"} 
                            valid_url_check={(value)=> valid_url_check(value)} 
                            id={action.id}
                            index={action.index}
                        />
                    )
                default:
                    return null
            }
        case "blog":
            switch(action.type.toLowerCase()){
                case "view":
                    return(
                        <VisitSocialMedia 
                            link={action.url} 
                            action_done={(event)=> action_done(event, true)} 
                        />
                    )
                case "write a blog post":
                    return(
                        <SubmitUrlAction 
                            provider={""} 
                            valid_url_check={(value)=> valid_url_check(value)} 
                            id={action.id}
                            index={action.id}
                        />
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
                    return (
                        <DiscordJoin 
                            url={action.url} 
                            action_done={(event, value)=> action_done(event, value)} 
                            closeModal={event => closeModal(event)}
                        />
                    )
                default:
                    return null
            }
        case "spotify":
            switch(action.type.toLowerCase()){
                case "listen to":
                    return (
                        <SpotifyIframe 
                            url={action.url} 
                            action_done={(event, value)=> action_done(event, value)} 
                            onError={()=> handleError()}
                        />
                    )
                case "save album":
                case "save track":
                    return (
                        <SpotifySave 
                            url={action.url} 
                            action_done={(event, value)=> action_done(event, value)} 
                            onError={()=> handleError()}
                        />
                    )
                case "follow playlist":
                    return (
                        <SpotifyFollowPlaylist 
                            url={action.url} 
                            action_done={(event, value)=> action_done(event, value)} 
                            onError={()=> handleError()}
                        />
                    )
                case "follow artist":
                    return (
                        <SpotifyFollowArtist 
                            url={action.url} 
                            action_done={(event, value)=> action_done(event, value)} 
                            onError={()=> handleError()}
                        />
                    )
                default:
                    return null
            }
        case "website":
            switch(action.type.toLowerCase()){
                case "visit link":
                    return (
                        <VisitSocialMedia 
                            link={action.url} 
                            action_done={(event)=> action_done(event, true)} 
                        />
                    )
                default:
                    return null
            }
        case "newsletter":
            switch(action.type.toLowerCase()){
                case "subscribe to newsletter":
                    return (
                        <SubscribeToNewsLetter 
                            valid_url_check={(value)=> valid_url_check(value)}  
                            id={action.id}
                            index={action.index}
                        />
                    )
                default:
                    return null
            }
        case "question":
            switch(action.type.toLowerCase()){
                case "answer question":
                    return (
                        <SubmitTextAction 
                            valid_answer_check={(value)=> valid_answer_check(value)} 
                            text={action.url} 
                            id={action.id}
                            index={action.index}
                        />
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
            closeModal()
            return null
    }
}