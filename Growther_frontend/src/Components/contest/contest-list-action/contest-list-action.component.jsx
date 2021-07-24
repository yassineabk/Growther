import React from "react"
import { ActionIcon } from "../actions-icons/actions-icons.component"
export const ListAction = ({element, addAction})=>{
    var newAction = ()=>{
        if(Array.isArray(element.actions)){
            var actionsObj = {}
            element.actions.map(item =>{
                actionsObj[item] = {
                    link: "", points: 1
                }
            })
            addAction({provider: element.provider, active: element.actions[0], actions: actionsObj, listOfActions: element.actions})
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