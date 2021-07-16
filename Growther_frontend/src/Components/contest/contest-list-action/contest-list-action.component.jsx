import React from "react"
export const ListAction = ({action})=>{
    return(
        <div id={action} className="actionsListItem is-flex is-justify-content-center is-align-items-center">
            <div>{action}</div>
        </div>
    )
}