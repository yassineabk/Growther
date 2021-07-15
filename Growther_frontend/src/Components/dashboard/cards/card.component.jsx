import React from "react"
export const CardComponent = ({img, title, date, button})=>{
    return(
        <div className="column is-flex is-flex-direction-column article">
            <img src={img ? img : require("../../../assets/icons/datalist.jpg").default} />
            <div className="article-infos is-flex is-flex-direction-row">
                <div className="article-title">
                    {title ? title : "Nothing"}
                </div>
                <div className="article-date">
                    {date ? date : "xx days"}
                </div>
            </div>
            {button === "My Contests" ? 
                <div className="article-buttons is-flex is-flex-direction-row">
                    <div className="details-button">Details</div>
                    <div className="duplicate-button">Duplicate</div>
                </div> : 
                <div className="article-buttons is-flex is-flex-direction-row">
                    <div className="details-button"></div>
                    <div className="duplicate-button">Customize</div>
                </div>
            }
        </div>
    )
}