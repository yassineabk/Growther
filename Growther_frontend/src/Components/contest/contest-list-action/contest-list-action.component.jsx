import React from "react"
import { ActionIcon } from "../actions-icons/actions-icons.component"
export const ListAction = ({element, addAction, index})=>{
    var newAction = ()=>{
        if(Array.isArray(element.actions)){
            addAction({provider: element.provider, url: "", points: 1, type: element.actions[0], listOfActions: element.actions, id:index+1})
        }
    }
    return(
        <div 
            onClick={()=> newAction()} 
            id={element.provider.toLowerCase()} 
            className="actionsListItem is-flex is-justify-content-center is-align-items-center">
            <ActionIcon provider={element.provider} />
            <div>{element.provider}</div>
        </div>
    )
}