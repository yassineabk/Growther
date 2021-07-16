import React from "react"
import { ContestAction } from "../contest-action/contest-action.component"
export const ContestActions = ({data})=>{
    return(
        <div className="contestActions">
            {Array.isArray(data) ? data.map((element, index)=>{
                <ContestAction  />
            }) : null}
        </div>
    )
}