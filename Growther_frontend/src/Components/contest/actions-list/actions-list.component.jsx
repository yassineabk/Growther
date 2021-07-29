import React from "react"
import { ListAction } from "../contest-list-action/contest-list-action.component"
export const ActionsList = ({actions, addAction, title})=>{
    return(
        <div className="actionsList is-flex is-flex-wrap-wrap">
            {Array.isArray(actions) ? actions.map((element, index)=>{
                return <ListAction key={`actions${index}${element.provider}`} index={index} element={element} addAction={(action)=> addAction(action)} />
            }) : null}
        </div>
    )
}