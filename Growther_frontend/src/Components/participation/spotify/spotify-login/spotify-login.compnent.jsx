import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { SPOTIFY_AUTH_URL } from "../../../../services/links"
export const SpotifyAuthComponent = ()=>{
    const oauth = SPOTIFY_AUTH_URL
    var {direction} = useSelector(state => state.userInfos)
    var {t} = useTranslation()
    return(
        <div dir={direction ? direction : "ltr"} id="spotifyAuthContainer" className="is-flex is-justify-content-center is-align-items-center">
            <div dir={direction ? direction : "ltr"} onClick={(event)=> window.open(oauth, "_blank")} className="spotifyAuthButton is-flex">
                <span>
                    <img dir={direction ? direction : "ltr"} alt="" className="spotifyAuthLogo" src={require("../../../../assets/icons/spotify.png").default} />
                </span>
                <span>
                    {t("login_with_spotify")}
                </span>
            </div>
        </div>
    )
}