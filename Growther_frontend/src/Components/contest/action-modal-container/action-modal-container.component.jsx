import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { ActionDone, CloseActionModal } from "../../../redux/contest-card/contest-card-actions"
import { ActionModal } from "../action-modal/action-modal.component"
import { PreviewAction } from "../preview-action/preview-action.component"
export const ActionModalContainer = ({action, show})=>{
    var dispatch = useDispatch()
    var [activeButton, setActiveButton] = useState(false)
    var [isLoading, setLoading] = useState(true)
    var closeModal = (event)=>{
        var container = document.getElementById("actionIframe")
        if(container !== null && typeof(container) === "object"){
            if(!container.contains(event.target)){
                CloseActionModal(dispatch)
                setActiveButton(false)
            }
        }
    }
    var action_done = (event)=>{
        setLoading(false)
        setTimeout(()=>{
            setActiveButton(true)
        }, 10000)
    }
    var valid_answer_check = (value)=>{
        if(value !== null && typeof(value) === "string"){
            var valid = value.length > 100
            setActiveButton(valid)
        }
    }
    var valid_url_check = (value)=>{
        setActiveButton(value)
    }
    if(!show) return null
    if(action === null && typeof(action) !== "object" && action.provider === null && typeof(action.provider) !== "string") return null
    return(
        <div onClick={event => closeModal(event)} id="actionModal" className="Modal">
            <div className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
                <div id={"actionIframe"} className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center actionModal-body">
                    <PreviewAction  
                        provider={action.provider}
                        links={action.type}
                        //selected={Array.isArray(previewActions) ? previewActions[index] : undefined}
                        points={action.points}
                    />
                    <ActionModal 
                        action={action} 
                        valid_answer_check={(value)=> valid_answer_check(value)} 
                        valid_url_check={(value) => valid_url_check(value)}
                        action_done={(event)=> action_done(event)} />
                    <div className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
                        <div className="button-container is-flex is-justify-content-flex-end">
                            <div onClick={activeButton ? ()=> {
                                setActiveButton(false)
                                ActionDone(dispatch, action.id, action.index, action.points)
                            } : ()=> false} className={`${activeButton ? "" : "active "}buttonContainer is-flex is-justify-content-center is-align-items-center`}>
                                Continue
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}