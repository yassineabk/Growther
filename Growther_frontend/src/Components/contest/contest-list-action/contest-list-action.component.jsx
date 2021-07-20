import React from "react"
export const ListAction = ({element, addAction})=>{
    var newAction = ()=>{
        if(Array.isArray(element.actions)){
            var actionsObj = {}
            element.actions.map(item =>{
                actionsObj[item] = {
                    actionUrl: "", points: 1
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
            <div>{element.provider}</div>
        </div>
    )
}