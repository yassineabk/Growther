import React from "react"
export const FacebookViewPost = ({url, action_done, closeModal})=>{
    var LinkMaker = (url)=>{
        while(url[url.length - 1] === "/"){
            url = url.slice(0, url.length - 1)
        }
        url = url.replaceAll(":", "%3A").replaceAll("/", "%2F")
        return url
    }
    return (
        <iframe
            title="facebook-iframe"
            id={"iframe"}
            onLoad={(event)=> action_done(event, true)}
            onError={()=> closeModal()}
            src={`https://www.facebook.com/plugins/post.php?href=${url !== null && typeof(url) === "string" ? LinkMaker(url) : ""}&width=750&show_text=true&appId=549723986167815&height=273`}
            width="750" 
            height="273" 
            style={{border:"none !important", overflow:"hidden", borderRadius: 0}} 
            scrolling="yes" 
            frameBorder={"0"} 
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
        </iframe>
    )
}