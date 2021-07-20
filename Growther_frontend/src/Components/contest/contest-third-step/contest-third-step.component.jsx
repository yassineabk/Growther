import React from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router"
import { Redirect } from "react-router-dom"
export const ContestThirdStep = () =>{
    var {isValidData, isValidActions} = useSelector(state => state.contest)
    var location = useLocation()
    var copyClipoard = ()=>{
        navigator.clipboard.writeText("https://www.did.com/contestId")
        document.getElementById("contestLink").classList.add("copied")
        setTimeout(()=>{
            document.getElementById("contestLink").classList.remove("copied")
        }, 2000)
    }
    if(location.pathname !== "/dashboard/My Contests/new/thirdStep") return null
    if(isValidActions === false) return <Redirect  to="/dashboard/My Contests/new/secondStep"/>
    if(isValidData === false) return <Redirect  to="/dashboard/My Contests/new/firstStep"/>
    return(
        <div className="savedContest is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            <div className="bigText">Congaturlation</div>
            <div className="subText">Your contest is ready, you copy the link</div>
            <div id="contestLink" onClick={()=> copyClipoard()} className="contestLink">https://www.did.com/contestId</div>
            <div className="subText">Share via social media</div>
            <div className="socialActions">
            </div>
        </div>
    )
}