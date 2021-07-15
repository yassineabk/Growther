import React from "react"
import { Link, useLocation } from "react-router-dom"
const test = [
    <div className="column is-flex is-flex-direction-column article">
        <img src={require("../../assets/icons/datalist.jpg").default} />
        <div className="article-infos is-flex is-flex-direction-row">
            <div className="article-title">
                {"Nothing"}
            </div>
            <div className="article-date">
                {"xx days"}
            </div>
        </div>
        <div className="article-buttons is-flex is-flex-direction-row">
            <div className="details-button">Details</div>
            <div className="duplicate-button">Duplicate</div>
        </div>
    </div>,
    <div className="column is-flex is-flex-direction-column article">
        <img src={require("../../assets/icons/datalist.jpg").default} />
        <div className="article-infos is-flex is-flex-direction-row">
            <div className="article-title">
                {"Nothing"}
            </div>
            <div className="article-date">
                {"xx days"}
            </div>
        </div>
        <div className="article-buttons is-flex is-flex-direction-row">
            <div className="details-button">Details</div>
            <div className="duplicate-button">Duplicate</div>
        </div>
    </div>,
    <div className="column is-flex is-flex-direction-column article">
        <img src={require("../../assets/icons/datalist.jpg").default} />
        <div className="article-infos is-flex is-flex-direction-row">
            <div className="article-title">
                {"Nothing"}
            </div>
            <div className="article-date">
                {"xx days"}
            </div>
        </div>
        <div className="article-buttons is-flex is-flex-direction-row">
            <div className="details-button">Details</div>
            <div className="duplicate-button">Duplicate</div>
        </div>
    </div>,
    <div className="column is-flex is-flex-direction-column article">
        <img src={require("../../assets/icons/datalist.jpg").default} />
        <div className="article-infos is-flex is-flex-direction-row">
            <div className="article-title">
                {"Nothing"}
            </div>
            <div className="article-date">
                {"xx days"}
            </div>
        </div>
        <div className="article-buttons is-flex is-flex-direction-row">
            <div className="details-button">Details</div>
            <div className="duplicate-button">Duplicate</div>
        </div>
    </div>
]
export const Listwithimages = ({data, title})=>{
    var location = useLocation()
    var locations = ["/dashboard/My Contests", "/dashboard/Templates"]
    return(
        <div className="is-flex is-flex-direction-column list-container">
            <div className="list-title">
                {title ? title : "No Title"}
            </div>
            <div className="columns is-multiline is-flex is-flex-row articles">
                {Array.isArray(data) ? data.map((element, index)=>{
                    return(
                        <div className="column is-flex is-flex-direction-column article">
                            <img src={element.img ? element.img : require("../../assets/icons/datalist.jpg").default} />
                            <div className="article-infos is-flex is-flex-direction-row">
                                <div className="article-title">
                                    {element.title ? element.title : "Nothing"}
                                </div>
                                <div className="article-date">
                                    {element.date ? element.date : "xx days"}
                                </div>
                            </div>
                            <div className="article-buttons is-flex is-flex-direction-row">
                                <div className="details-button">Details</div>
                                <div className="duplicate-button">Duplicate</div>
                            </div>
                        </div>                    
                    )
                }): test}
            </div>
            {locations.includes(location.pathname) ? null : <div className="arrow-button-container is-flex is-justify-content-flex-end">
                <div className="arrow-button">
                    <Link to={"/dashboard" + `${title ? "/"+title : ""}`} >
                        <img src={require("../../assets/icons/right-arrow.png").default}/>
                    </Link>
                </div>
            </div>}
        </div>
    )
}