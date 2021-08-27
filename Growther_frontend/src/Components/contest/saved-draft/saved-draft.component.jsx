import React from "react"
import { TimeLeft } from "../../../services/timeLeft"
import { CardComponent } from "../../dashboard/card/card.component"
export const SavedDraft = ({element, isBrand})=>{
    if(element === null || typeof(element) !== "object") return null
    return(
        <div id="draft-saved" style={{top:`${element.positionY - 20}px`, left:`${element.positionX - 40}px`}} >
            <CardComponent
                element={element}
                title={element.title}
                date={element.date}
                views={element.views}
                description={element.description}
                timeLeft={TimeLeft(element.endDate ? element.endDate.trim().replace(" ", "T") : "", element.endTime)}
                entries={element.entries}
                isBrand={isBrand}
            /> 
        </div>
    )
}