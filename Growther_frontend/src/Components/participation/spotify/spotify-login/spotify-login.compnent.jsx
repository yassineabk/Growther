import React from "react"
import { SPOTIFY_AUTH_URL } from "../../../../services/links"
export const SpotifyAuthComponent = ()=>{
    const oauth = SPOTIFY_AUTH_URL
    return(
        <div id="spotifyAuthContainer" className="is-flex is-justify-content-center is-align-items-center">
            <div onClick={(event)=> window.open(oauth, "_blank")} className="spotifyAuthButton is-flex">
                <span>
                    <img alt="" className="spotifyAuthLogo" src={require("../../../../assets/icons/spotify.png").default} />
                </span>
                <span >
                    Login with spotify
                </span>
            </div>
        </div>
    )
}