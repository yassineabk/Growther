import React from "react"
import { ShowMoreButton } from "../show-more/show-more.component"
var test = [
    <div className="is-flex is-flex-direction-row contestContainer">
        <div className="calendarIcon">
            <img src={require("../../../assets/icons/calendar.png").default} />
        </div>
        <div className="contestInfos is-flex is-flex-direction-column">
            <div className="contestTitle">
                {"No title"}
            </div>
            <div className="contestEndingDate is-flex is-flex-direction-row">
                <div>Ending in:</div>
                <div>{"xx days"}</div>
            </div>
        </div>
    </div>,
    <div className="is-flex is-flex-direction-row contestContainer">
        <div className="calendarIcon">
            <img src={require("../../../assets/icons/calendar.png").default} />
        </div>
        <div className="contestInfos is-flex is-flex-direction-column">
            <div className="contestTitle">
                {"No title"}
            </div>
            <div className="contestEndingDate is-flex is-flex-direction-row">
                <div>Ending in:</div>
                <div>{"xx days"}</div>
            </div>
        </div>
    </div>,
    <div className="is-flex is-flex-direction-row contestContainer">
        <div className="calendarIcon">
            <img src={require("../../../assets/icons/calendar.png").default} />
        </div>
        <div className="contestInfos is-flex is-flex-direction-column">
            <div className="contestTitle">
                {"No title"}
            </div>
            <div className="contestEndingDate is-flex is-flex-direction-row">
                <div>Ending in:</div>
                <div>{"xx days"}</div>
            </div>
        </div>
    </div>,
    <div className="is-flex is-flex-direction-row contestContainer">
        <div className="calendarIcon">
            <img src={require("../../../assets/icons/calendar.png").default} />
        </div>
        <div className="contestInfos is-flex is-flex-direction-column">
            <div className="contestTitle">
                {"No title"}
            </div>
            <div className="contestEndingDate is-flex is-flex-direction-row">
                <div>Ending in:</div>
                <div>{"xx days"}</div>
            </div>
        </div>
    </div>
]
test = test.concat(test)
export const RecentContests = ({data})=>{
    return(
        <div className="is-flex is-flex-direction-column list-container recentContests">
            <div className="list-title">
                Recent Contests
            </div>
            <div className="is-flex is-flex-direction-column">
                {Array.isArray(data) ? data.slice(0,5).map((element, index)=>{
                    return(
                        <div className="is-flex is-flex-direction-row contestContainer">
                            <div >
                                <img className="calendarIcon" src={require("../../../assets/icons/calendar.png").default} />
                            </div>
                            <div className="contestInfos is-flex is-flex-direction-column">
                                <div className="contestTitle">
                                    {element.title ? element.title : "No title"}
                                </div>
                                <div className="contestEndingDate is-flex is-flex-direction-row">
                                    <div>Ending in:</div>
                                    <div>{element.data ? element.date : "xx days"}</div>
                                </div>
                            </div>
                        </div>
                    )
                }) : test.slice(0,5)}
            </div>
            <ShowMoreButton title={"recentcontests"} />
            {/*<div className="arrow-button-container is-flex is-justify-content-flex-end">
                <div className="arrow-button">
                    <Link to={"/dashboard/recentcontests"} ><img src={require("../../assets/icons/right-arrow.png").default}/></Link>
                </div>
            </div>*/}
        </div>
    )
}