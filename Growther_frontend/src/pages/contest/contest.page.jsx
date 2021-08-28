import { decode } from "jsonwebtoken"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import { PreviewCard } from "../../Components/contest/preview-card/preview-card.component"
import { Spinner } from "../../Components/spinner/spinner.component"
import { ActionDone, OpenActionModal, SelectAction, SetData, SetDataFromLocation } from "../../redux/contest-card/contest-card-actions"
import { TimeLeft } from "../../services/timeLeft"
const Contest = ()=>{
    var [token, setToken] = useState(localStorage.getItem("accessToken"))
    var [userId, setId] = useState("")
    var dispatch = useDispatch()
    var params = useParams()
    var location = useLocation()
    var {information, selected, isLoading, error, points, canParticipate, isDoingAction} = useSelector(state => state.contest_card)
    var {isBrand} = useSelector(state => state.userInfos)
    useEffect(()=>{
        window.addEventListener("storage", event =>{
            var value = event.newValue
            setToken(value)
            if(value && value !== null){
                SetData(dispatch, params.title, params.description, params.id)
            }
        })
        token = decode(token)
        var sub = token !== null && typeof(token) === "object" ? token.sub : ""
        setId(sub)
        if(location.state){
            SetDataFromLocation(dispatch, location.state)
        }else{
            SetData(dispatch, params.title, params.description, params.id)
        }
    }, [dispatch, userId, location])
    var changeHandler = (event, provider)=>{
        var index = parseInt(event.target.selectedIndex)
        SelectAction(dispatch, provider, index)
    }
    var hasStarted = (d)=>{
        var currentDate = new Date()
        var currentDay = ("0" + currentDate.getDate()).slice(-2)
        var currentMonth = ("0"+ parseInt(currentDate.getMonth()+1 === 13 ? 1 : currentDate.getMonth()+1)).slice(-2)
        var currentYear = currentDate.getFullYear()
        var date = currentYear + "-" + currentMonth + "-" + currentDay
        var daysDiff = Math.ceil((new Date(date) - new Date(d.split("T")[0]))/(1000*60*60*24))
        if(daysDiff >= 0) return true
        return false
    }
    var hasEnded = (d)=>{
        var currentDate = new Date()
        var currentDay = ("0" + currentDate.getDate()).slice(-2)
        var currentMonth = ("0"+ parseInt(currentDate.getMonth()+1 === 13 ? 1 : currentDate.getMonth()+1)).slice(-2)
        var currentYear = currentDate.getFullYear()
        var date = currentYear + "-" + currentMonth + "-" + currentDay
        var daysDiff = Math.ceil((new Date(date) - new Date(d.split("T")[0]))/(1000*60*60*24))
        if(daysDiff < 0) return true
        return false
    }
    var DoAction = (index, element)=>{
        OpenActionModal(dispatch, index, element)
    }
    var DoBonus = (index, element)=>{
        if(information !== null && information !== undefined && typeof(information) === "object" && Array.isArray(information.actions)){
            var result = true
            information.actions.map((item, index) =>{
                if(item !== null && typeof(item) === "object"){
                    if(item.provider.toLowerCase() === "bonus" && (item.isDone || item.done)){
                        result = result && false
                    }
                    if(item.provider.toLowerCase() !== "bonus"){
                        result = result && (item.isDone || item.done)
                    }
                }else{
                    result = result && false
                }
            })
            if(result && !isDoingAction){
                ActionDone(dispatch, element, element.id, index, element.points, information.idContest, canParticipate, information.participationId, information.actions, information, isBrand === "true")
            }
        }
    }
    var showLoginForm = (value)=>{
        if(value){
            window.open("/login")
        }
    }
    return(
        <div className="is-flex is-flex-direction-column contest is-justify-content-center is-align-items-center">
            <Spinner show={isLoading} />
            {information !== null && information !== undefined && typeof(information) === "object" && !isLoading && typeof(information.user) === "object" ? 
                <PreviewCard
                    element={information}
                    title={information.title}
                    points={points}
                    id={information.idContest}
                    description={information.description}
                    timeLeft={information.endDate ? TimeLeft(information.endDate.trim().replace(" ","T"), information.endTime).date : ""}
                    dateType={TimeLeft(information.endDate.trim().replace(" ","T"), information.endTime).type}
                    actions={Array.isArray(information.actions) ? information.actions : []}
                    prizes={information.prizes}
                    previewActions={selected}
                    contestDone={information.done || information.isDone}
                    changeHandler={(event, provider)=> changeHandler(event, provider)}
                    buttons={information.user !== null && typeof(information.user) === "object" && information.user.isBrand === "true" ? userId.toString() === information.user.id.toString() : false}
                    hasStarted={typeof(information.startDate) === "string" ? hasStarted(information.startDate.trim().replace(" ","T").split("T")[0]) : false}
                    hasEnded={typeof(information.endDate) === "string" ? hasEnded(information.endDate.trim().replace(" ","T").split("T")[0]) : true}
                    user_id={typeof(information.user) === "object" ? information.user.id.toString() : ""}
                    isPublished={information.status !== "DRAFT" ? true  : false}
                    immediately={information.immediately === "true" || information.immediately === true ? true : false}
                    canParticipate={canParticipate}
                    error={error}
                    totalPoints={information}
                    status={information.status}
                    DoAction={(index, element)=> DoAction(index, element)}
                    DoBonus={(index, element) => DoBonus(index, element)}
                    showLoginForm={showLoginForm && {}.toString.call(showLoginForm) === '[object Function]' ? (value)=> showLoginForm(value) : ()=> false}
                /> 
            : null}
        </div>
    )
}
export default Contest;