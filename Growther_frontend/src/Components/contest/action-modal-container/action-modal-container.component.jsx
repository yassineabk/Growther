import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { ActionDone, CloseActionModal } from "../../../redux/contest-card/contest-card-actions"
import { HideErrorModal } from "../../../redux/errors/errors-actions"
import { ActionModal } from "../action-modal/action-modal.component"
import { PreviewAction } from "../preview-action/preview-action.component"
const ActionModalContainer = ({action, show, idContest, canParticipate, participationId, actions, isLoading})=>{
    var dispatch = useDispatch()
    var [activeButton, setActiveButton] = useState(false)
    var [countdown, setCount] = useState(10)
    var [withCountDown, setCountDown] = useState(false)
    var [error, setError] = useState({isError: false, message: ""})
    var [intervalIndex, setIntervalIndex] = useState(0)
    var {isBrand, direction} = useSelector(state => state.userInfos)
    var {information} = useSelector(state => state.contest_card)
    var {t} = useTranslation()
    useEffect(()=>{
        window.onpopstate = e =>{
            clearInterval(intervalIndex)
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
                    clearInterval(intervalIndex)
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
        startCountdown(WithCountdown, false)     
    }
    var startCountdown = (start)=>{
        var interval;
        if(start){
            setCountDown(true)
            interval = setInterval(()=>{
                setCount(prev => {
                    if(prev - 1 < 0){
                        setActiveButton(true)
                        return 0
                    }else{
                        return prev - 1
                    }
                })
            }, 1000)
            setIntervalIndex(interval)
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
                <div dir={direction ? direction : "ltr"} id={"actionIframe"} className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center actionModal-body">
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
                        <div dir={direction ? direction : "ltr"} className="button-container is-flex is-justify-content-flex-end">
                            {error.isError ? <div dir={direction ? direction : "ltr"} id="countdown"><span>{t(error.message)}</span></div> : null}
                            {withCountDown && !error.isError ? <div dir={direction ? direction : "ltr"} id="countdown"><span>00:{("0"+countdown).slice(-2)}</span></div> : null}
                            <div 
                                onClick={activeButton && !isLoading ? (event)=> {
                                    console.log(actions, "here")
                                    ActionDone(dispatch, action, action.id, action.index, action.points, idContest, canParticipate, participationId, actions, information, isBrand === "true")
                                        .then(value =>{
                                            if(value){
                                                setActiveButton(false)
                                                setCountDown(false)
                                                setCount(10)
                                                clearInterval(intervalIndex)
                                                setError({isError: false, message: ""})
                                            }else{
                                                setCountDown(false)
                                                setCount(10)
                                                clearInterval(intervalIndex)
                                                setError({isError: true, message: "something_went_wrong"})
                                            }
                                        })
                                    } : ()=> false} 
                                    className={`${activeButton ? "" : "active"} buttonContainer is-flex is-justify-content-center is-align-items-center`}
                                    dir={direction ? direction : "ltr"}
                                >
                                   {t("continue")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ActionModalContainer;