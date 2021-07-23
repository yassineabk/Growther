import React from "react"
import { CardTitle } from "../card-title/card-title.component"
import { CardComponent } from "../card/card.component"
const test = [
    {
        "title": "yassine",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "winnersNbr": 1,
        "startDate": "2021-07-25",
        "endDate": "2021-08-24",
        "duration": {
            "value": 1,
            "type": "months"
        },
        "maxParticipants": 0,
        "prizes": {
            "prize0": ""
        }
    },
    {
        "title": "yassine",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "winnersNbr": 1,
        "startDate": "2021-07-25",
        "endDate": "2021-08-24",
        "duration": {
            "value": 1,
            "type": "months"
        },
        "maxParticipants": 0,
        "prizes": {
            "prize0": ""
        }
    },
    {
        "title": "yassine",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "winnersNbr": 1,
        "startDate": "2021-07-25",
        "endDate": "2021-08-24",
        "duration": {
            "value": 1,
            "type": "months"
        },
        "maxParticipants": 0,
        "prizes": {
            "prize0": ""
        }
    },
    {
        "title": "yassine",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "winnersNbr": 1,
        "startDate": "2021-07-25",
        "endDate": "2021-08-24",
        "duration": {
            "value": 1,
            "type": "months"
        },
        "maxParticipants": 0,
        "prizes": {
            "prize0": ""
        }
    }
]
export const CardsContainer = ({data, title, showMore, addNew})=>{
    return(
        <div className="is-flex is-flex-direction-column list-container">
            <CardTitle title={title} addNew={addNew} showMore={showMore} />
            <div className="columns is-multiline is-flex is-flex-row cards">
                {Array.isArray(data) ? data.map((element, index)=>{
                    if(typeof(element) !== "object") return null
                    return(
                        <CardComponent 
                            title={element.title}
                            date={element.date}
                            views={element.views}
                            description={element.description}
                            date={element.duration.value}
                            dateType={element.duration.type}
                            entries={element.entries}
                        />                    
                    )
                }): test.map((element, index)=>{
                    if(typeof(element) !== "object") return null
                    return(
                        <CardComponent 
                            title={element.title}
                            date={element.duration.value}
                            dateType={element.duration.type}
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