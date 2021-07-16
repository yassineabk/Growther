import React from "react"
export const CardComponent = ({img, title, date, button})=>{
    return(
        <div className="column is-flex is-flex-direction-column card">
            <img src={img ? img : require("../../../assets/icons/datalist.jpg").default} />
            <div className="card-infos is-flex is-flex-direction-row">
                <div className="card-title">
                    {title ? title : "Nothing"} {button + "hello"}
                </div>
                <div className="card-date">
                    {date ? date : "xx days"}
                </div>
            </div>
            {button === "My Contests" ? 
                <div className="card-buttons is-flex is-flex-direction-row">
                    <div className="details-button">Details</div>
                    <div className="duplicate-button">Duplicate</div>
                </div> : 
                <div className="card-buttons is-flex is-flex-direction-row">
                    <div className="details-button"></div>
                    <div className="duplicate-button">Customize</div>
                </div>
            }
        </div>
    )
}