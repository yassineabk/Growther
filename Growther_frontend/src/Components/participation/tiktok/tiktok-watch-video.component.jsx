import axios from "axios"
import React, { useEffect, useState } from "react"
export const TiktokWatchVideo = ({url, action_done, closeModal})=>{
    var createMarkup = (html) => {
        return {__html: html};
      }
    var [html, setHtml] = useState("")
    useEffect(()=>{
        axios.get(`https://www.tiktok.com/oembed?url=${url}`)
            .then(response => setHtml(response.data.html))
            .catch(err => err)
    })
    return(
        <div  onError={(event)=> console.log(event)} onLoad={(event)=> console.log(event.target)} id="tiktokIframe" dangerouslySetInnerHTML={createMarkup(html)}>

        </div>
    )
}