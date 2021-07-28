import React from "react"
import { PreviewActionsList } from "../preview-actions-list/preview-actions-list.component"
import { PreviewPrizesList } from "../preview-prizes-list/preview-prizes-list.component"
export const PreviewCard = ({title, description, timeLeft, dateType, views, entries, actions, previewActions, changeHandler, prizes})=>{
    var loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    var hoverCard = (event)=>{
        document.getElementById("card").classList.toggle("backface")
    }
    return(
        <div id="card" className="is-flex previewCard">
            <div className="left-side is-flex is-flex-direction-column">
                <div className="card-views is-flex is-flex-direction-column">
                    <span className="little-title">
                        Total views
                    </span>
                    <span>
                        {views ? views : "xxxx"}
                    </span>
                </div>
                <div className="card-entries is-flex is-flex-direction-column">
                    <span className="little-title">
                        Total entries
                    </span>
                    <span>
                        {entries ? entries : "xxxx"}
                    </span>
                </div>
                <div className="card-date is-flex is-flex-direction-column">
                    <span className="little-title">
                        Time left
                    </span>
                    <span>
                        {timeLeft ? timeLeft : "xx"} <span className="dateType">{dateType ? dateType : " days"}</span>
                    </span>
                </div>
            </div>
            <div className="right-side is-flex is-flex-direction-column">
                <div className="card-infos is-flex is-flex-direction-column">
                    <div className="card-title is-flex is-justify-content-space-between">
                        <div>{title ? title : "Contest Title"}</div>
                        <div>
                            <img onClick={()=> hoverCard()} src={require("../../../assets/icons/trophy2.png").default} width={"20px"} />
                        </div>
                    </div>
                    <div className="card-description">
                        {description ? description : loremText.slice(0,250)}
                    </div>
                </div>
                <PreviewActionsList previewActions={previewActions} actions={actions} changeHandler={changeHandler && {}.toString.call(changeHandler) === '[object Function]' ? (event, provider) => changeHandler(event, provider) : ()=> false}/>
            </div>
            <div className="is-flex is-flex-row is-align-items-center back previewPrizes">
                <div onClick={()=> hoverCard()} className="backButton">
                    <img src={require("../../../assets/icons/back.png").default} width={"20px"} />
                </div>
                <PreviewPrizesList prizes={prizes}  />
            </div>
        </div>
    )
}