import React from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router"
import { Redirect } from "react-router-dom"
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton
} from "react-share";
const ContestThirdStep = () =>{
    var {isValidData, isValidActions, isPublished, contestLink} = useSelector(state => state.contest)
    var { isBrand } = useSelector(state => state.userInfos)
    var location = useLocation()
    var copyClipoard = ()=>{
        navigator.clipboard.writeText(contestLink)
        document.getElementById("contestLink").classList.add("copied")
        setTimeout(()=>{
            if(document.getElementById("contestLink") !== null && document.getElementById("contestLink") !== undefined && typeof(document.getElementById("contestLink") === "object")){
                document.getElementById("contestLink").classList.remove("copied")
            }
        }, 2000)
    }
    if(isBrand !== "true") return <Redirect to="/" />
    if(location.pathname !== "/dashboard/My Contests/new/thirdStep") return null
    if(isValidActions === false || isPublished === false) return <Redirect  to="/dashboard/My Contests/new/secondStep"/>
    if(isValidData === false) return <Redirect  to="/dashboard/My Contests/new/firstStep"/>
    return(
        <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center savedContest">
                <div className="bigText">Congaturlations</div>
                <div className="subText">Your contest is ready, you copy the link</div>
                <div id="contestLink" onClick={()=> copyClipoard()} className="contestLink">{contestLink}</div>
                <div className="subText">Share via social media</div>
                <div className="is-flex is-flex-direction-row is-justify-content-center">
                    <div className="socialIcons is-flex is-justify-content-space-between is-align-items-center">
                        <div>
                            <TwitterShareButton url={contestLink.replace(" ", "%20")}>
                                    <img src={require("../../../assets/icons/twitter2.png").default} width={"40px"}/>
                            </TwitterShareButton>
                        </div>
                        <div>
                            <FacebookShareButton url={contestLink.replace(" ", "%20")}>
                                    <img src={require("../../../assets/icons/facebook2.png").default} width={"40px"}/>
                            </FacebookShareButton>
                        </div>
                        <div>
                            <EmailShareButton url={contestLink.replace(" ", "%20")}>
                                <img src={require("../../../assets/icons/google.png").default} width={"40px"}/>
                            </EmailShareButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ContestThirdStep;