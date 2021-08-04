import React from "react"
export const EmptyList = ({isLoading})=>{
    if(isLoading){
        return(
            <div className="emptyList is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            </div>
        )
    }
    return(
        <div className="emptyList is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            You still don't have any contests to show
        </div>
    )
}