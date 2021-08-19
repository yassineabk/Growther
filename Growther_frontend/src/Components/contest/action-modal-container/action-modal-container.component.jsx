import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ActionDone, CloseActionModal } from "../../../redux/contest-card/contest-card-actions"
import { HideErrorModal } from "../../../redux/errors/errors-actions"
import { BACKEND_API } from "../../../services/links"
import { ActionModal } from "../action-modal/action-modal.component"
import { PreviewAction } from "../preview-action/preview-action.component"
export const ActionModalContainer = ({action, show, idContest})=>{
    var dispatch = useDispatch()
    var [activeButton, setActiveButton] = useState(false)
    var [countdown, setCount] = useState(10)
    var [withCountDown, setCountDown] = useState(false)
    var [isLoading, setLoading] = useState(true)
    var [error, setError] = useState({isError: false, message: ""})
    useEffect(()=>{
        window.onpopstate = e =>{
            setActiveButton(false)
            setCount(10)
            setCountDown(false)
            CloseActionModal(dispatch)
            HideErrorModal(dispatch)
        }
    }, [dispatch])
    var closeModal = (event)=>{
        var container = document.getElementById("actionIframe")
        if(container !== null && typeof(container) === "object"){
            if(event !== undefined){
                if(!container.contains(event.target)){
                    setActiveButton(false)
                    setCount(10)
                    setCountDown(false)
                    CloseActionModal(dispatch)
                }
            }
        }
    }
    var action_done = (event, WithCountdown)=>{
        if(withCountDown) return false
        startCountdown(WithCountdown)
        setTimeout(()=>{
            setActiveButton(true)
        }, 10000)        
    }
    var startCountdown = (start)=>{
        if(start){
            setCountDown(true)
            var value = countdown
            var interval = setInterval(()=>{
                if(value > 0){
                    value -= 1
                    setCount(prev => prev - 1)
                }else{
                    //setCountDown(false)
                    clearInterval(interval)
                }
            }, 1000)
        }
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
                        action_done={(event, value)=> action_done(event, value)} 
                        closeModal={()=> closeModal()}
                    />
                    <div className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
                        <div className="button-container is-flex is-justify-content-flex-end">
                            {error.isError ? <div id="countdown"><span>{error.message}</span></div> : null}
                            {withCountDown && !error.isError ? <div id="countdown"><span>00:{("0"+countdown).slice(-2)}</span></div> : null}
                            <div onClick={activeButton ? (event)=> {
                                ActionDone(dispatch, action, action.id, action.index, action.points, idContest)
                                    .then(value =>{
                                        if(value){
                                            setActiveButton(false)
                                            setCountDown(false)
                                            setCount(10)
                                            setError({isError: false, message: ""})
                                        }else{
                                            setCountDown(false)
                                            setCount(10)
                                            setError({isError: true, message: "Something went wrong"})
                                        }
                                    })
                                } : ()=> false} 
                                className={`${activeButton ? "" : "active "}buttonContainer is-flex is-justify-content-center is-align-items-center`}>
                                    Continue
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}