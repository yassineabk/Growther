import React from "react"
import { useLocation } from "react-router"
export const ContestThirdStep = () =>{
    var location = useLocation()
    if(location.pathname !== "/dashboard/My Contests/new/thirdStep") return null
    return(
        <div className="savedContest is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            <div className="bigText">Congaturlation</div>
            <div className="subText">Your contest is ready, you copy the link</div>
            <div className="contestLink">https://www.did.com/contestId</div>
            <div className="subText">Share via social media</div>
            <div className="socialActions">

            </div>
        </div>
    )
}