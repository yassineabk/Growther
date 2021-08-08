import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HideErrorModal } from "../../redux/errors/errors-actions"
export const ErrorsModal = ()=>{
    var errors = useSelector(state => state.errors)
    var dispatch = useDispatch()
    useEffect(()=>{
        document.addEventListener("click", event=>{
            var container = document.getElementById("errorContainer")
            if(container && container !== null && typeof(container) === "object"){
                if(!container.contains(event.target)){
                    HideErrorModal(dispatch)
                }
            }
        })
    })
    if(!errors.isError) return null
    return(
        <div id={"errorModal"} className="Modal">
            <div id={"errorContainer"} className="is-flex is-flex-direction-column">
                <div className="errorHead is-flex is-flex-direction-row">
                    <div>Error</div>
                    <div>
                        <img onClick={()=> HideErrorModal(dispatch)} src={require("../../assets/icons/close.png").default} />
                    </div>
                </div>
                <div className="errorBody is-flex">
                    <div>
                        {errors.errorMessage}
                    </div>
                </div>
            </div>
        </div>
    )
}