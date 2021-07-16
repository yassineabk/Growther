import React from "react"
import { ListAction } from "../contest-list-action/contest-list-action.component"
export const ActionsList = ({actions})=>{
    return(
        <div className="actionsList is-flex is-flex-direction is-flex-wrap-wrap">
            {Array.isArray(actions) ? actions.map((element, index)=>{
                <ListAction action={element} />
            }) : null}
        </div>
    )
}