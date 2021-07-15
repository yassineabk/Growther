import React from "react"
import { CardTitle } from "../card-title/card-title.component"
import { CardComponent } from "../cards/card.component"
import { ShowMoreButton } from "../show-more/show-more.component"
const test = [
    <div className="column is-flex is-flex-direction-column article">
        <img src={require("../../../assets/icons/datalist.jpg").default} />
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
        <img src={require("../../../assets/icons/datalist.jpg").default} />
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
        <img src={require("../../../assets/icons/datalist.jpg").default} />
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
        <img src={require("../../../assets/icons/datalist.jpg").default} />
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
export const CardsContainer = ({data, title})=>{
    return(
        <div className="is-flex is-flex-direction-column list-container">
            <CardTitle title={title} />
            <div className="columns is-multiline is-flex is-flex-row articles">
                {Array.isArray(data) ? data.map((element, index)=>{
                    return(
                        <CardComponent 
                            img={element.img} 
                            title={element.title}
                            date={element.date}
                            button={title}
                        />                    
                    )
                }): test}
            </div>
            <ShowMoreButton title={title} />
        </div>
    )
}