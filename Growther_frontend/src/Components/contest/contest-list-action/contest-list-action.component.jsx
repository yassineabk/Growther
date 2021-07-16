import React from "react"
export const ListAction = ({action, addAction})=>{
    return(
        <div 
            onClick={()=> addAction({name: action, action: "Like", actionUrl: "", points: 0})} 
            id={action.toLowerCase()} 
            className="actionsListItem is-flex is-justify-content-center is-align-items-center"
        >
            <div>{action}</div>
        </div>
    )
}