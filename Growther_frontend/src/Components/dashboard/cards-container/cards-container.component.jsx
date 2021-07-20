import React from "react"
import { CardTitle } from "../card-title/card-title.component"
import { CardComponent } from "../card/card.component"
const test = [
    {
        title: "Contest title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        views: 1000,
        entries: 200,
        date: "xxxx"
    },
    {
        title: "Contest title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        views: 1000,
        entries: 200,
        date: "xxxx"
    },
    {
        title: "Contest title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        views: 1000,
        entries: 200,
        date: "xxxx"
    },
    {
        title: "Contest title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        views: 1000,
        entries: 200,
        date: "xxxx"
    },
    {
        title: "Contest title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        views: 1000,
        entries: 200,
        date: "xxxx"
    },
    {
        title: "Contest title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        views: 1000,
        entries: 200,
        date: "xxxx"
    },
]
export const CardsContainer = ({data, title, showMore, addNew})=>{
    return(
        <div className="is-flex is-flex-direction-column list-container">
            <CardTitle title={title} addNew={addNew} showMore={showMore} />
            <div className="columns is-multiline is-flex is-flex-row cards">
                {Array.isArray(data) ? data.map((element, index)=>{
                    return(
                        <CardComponent 
                            title={element.title}
                            date={element.date}
                            views={element.views}
                            description={element.description}
                            entries={element.entries}
                        />                    
                    )
                }): test.map((element, index)=>{
                    return(
                        <CardComponent 
                            title={element.title}
                            date={element.date}
                            views={element.views}
                            description={element.description}
                            entries={element.entries}
                        />                    
                    )
                })}
            </div>
        </div>
    )
}