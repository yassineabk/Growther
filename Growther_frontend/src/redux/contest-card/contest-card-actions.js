import axios from "axios"
import { BACKEND_API } from "../../services/links"
import { TimeZone } from "../../services/timeLeft"
import { FailAlert, SuccessAlert } from "../alert/alert-actions"
import { AppendActionDone, AppendContest, AppendEditedContest } from "../contests/contests-actions"
import { ShowErrorModal } from "../errors/errors-actions"
import { Contest_Card_Types } from "./contest-card-types"
export const SetData = (dispatch, title, description, id) =>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        } 
    }
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    axios.get(`${BACKEND_API}/api/contests/${title}/${id}?timezone=${timeZone}`, config)
        .then(response =>{
            if(typeof(response.data) === "object"){
                var startDate, endDate;
                var data = response.data
                console.log(data)
                if(data.contest !== undefined  && data.contest !== null && typeof(data.contest) === "object"){
                    var {contest, user, participationActions, partipationDate, id, totalPoints, done} = data
                    startDate = contest.startDate
                    endDate = contest.endDate
                    startDate = startDate.trim().replace(" ", "T")
                    endDate = endDate.trim().replace(" ", "T")
                    contest = {
                        ...contest,
                        startDate,
                        endDate
                    }
                    var payload = {...contest, actions: participationActions, user, partipationDate, participationId: id, totalPoints, done}
                    dispatch({type: Contest_Card_Types.SET_CONTEST_STATE, payload: {data: payload, canParticipate: true}})
                }else{
                    startDate = data.startDate
                    endDate = data.endDate
                    startDate = startDate.trim().replace(" ", "T")
                    endDate = endDate.trim().replace(" ", "T")
                    data = {
                        ...data,
                        startDate,
                        endDate
                    }
                    dispatch({type: Contest_Card_Types.SET_CONTEST_STATE, payload:{data: response.data, canParticipate: false}})
                }
            }else{
                dispatch({type: Contest_Card_Types.CONTEST_CARD_ERROR})
                ShowErrorModal(dispatch, "Couldn't get this contest please try again later")
            }
        }).catch(err =>{
            dispatch({type: Contest_Card_Types.CONTEST_CARD_ERROR})
            ShowErrorModal(dispatch, "Couldn't get this contest please try again later")
        })
}
export const SetDataFromLocation = (dispatch, data, canParticipate)=>{
    try{
        dispatch({type: Contest_Card_Types.SET_CONTEST_STATE, payload: {data, canParticipate: canParticipate && canParticipate !== undefined ? canParticipate : false}})
    }catch{
        dispatch({type: Contest_Card_Types.SET_CONTEST_CARD_DATA_FAIL})
    }
}
export const SelectAction = (dispatch, provider, index)=>{
    try{
        dispatch({type: Contest_Card_Types.SELECTED_ACTION, payload: {provider, index}})
    }catch{
        dispatch({type: Contest_Card_Types.SET_CONTEST_CARD_DATA_FAIL})
    }
}
export const OpenActionModal = (dispatch, index, element)=>{
    try{
        dispatch({type: Contest_Card_Types.DO_ACTION, payload: element !== null && typeof(element) === "object" ? {element, index} : {}})
    }catch{
        dispatch({type: Contest_Card_Types.SET_CONTEST_CARD_DATA_FAIL})
    }
}
export const CloseActionModal = (dispatch)=>{
    try{
        dispatch({type: Contest_Card_Types.CLOSE_MODAL})
    }catch{
        dispatch({type: Contest_Card_Types.SET_CONTEST_CARD_DATA_FAIL})
    }
}
export const ActionDone = async (dispatch, action, id, index, points, idContest, canParticpate, participationId, actions, contest, isBrand)=>{
    dispatch({type: Contest_Card_Types.DOING_ACTION})
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
    }
    var participationActions = {}
    Object.keys(action).map(key=>{
        if(!["id", "index"].includes(key)){
            participationActions[key] = action[key]
        }
        return true
    })
    participationActions.done = true
    var date = new Date()
    var day = ("0"+date.getDate()).slice(-2)
    var month = ("0"+parseInt(date.getDate() + 1 === 13 ? 1 : date.getDate() + 1)).slice(-2)
    var year = date.getFullYear()
    var hour = ("0"+date.getHours()).slice(-2)
    var min = ("0"+date.getMinutes()).slice(-2)
    var seconds = ("0"+date.getSeconds()).slice(-2)
    var mseconds = ("0"+date.getMilliseconds()).slice(-3)
    var timeZone = date.getTimezoneOffset()
    if(canParticpate && canParticpate !== undefined && participationId && participationId !== undefined){
        return axios.put(`${BACKEND_API}/api/participations/update/participation/${action.id}`, participationActions, config)
        .then(response =>{
            dispatch({type: Contest_Card_Types.ACTION_DONE, payload: {id, index, points, participationId, provider: action.provider}})
            return true
        }).catch(err =>{
            dispatch({type: Contest_Card_Types.ACTION_FAIL})
            return false
        }).then(value =>{
            if(value){
                if(!isBrand){
                    AppendActionDone(dispatch, contest.idContest, id, action)
                }
                SuccessAlert(dispatch, "Action Done!")
            }else{
                FailAlert(dispatch, "Action Fail")
            }
            return value
        })
    }
    actions = actions.map(element =>{
        var newElement = {}
        Object.keys(element).map(key=>{
            if(!["id", "index"].includes(key)){
                newElement[key] = element[key]
            }
            return true
        })
        return newElement
    })
    var data = {
        partipationDate: `${year}-${month}-${day}T${hour}:${min}:${seconds}.${mseconds}${TimeZone(timeZone)}`,
        participationActions: [...actions, participationActions]
    }
    return axios.post(`${BACKEND_API}/api/participations/create/${idContest}`, data, config)
        .then(response =>{
            var {participationActions} = response.data
            dispatch({type: Contest_Card_Types.ACTION_DONE, payload: {id, index, points, participationId: response.data.id, actions: participationActions}})
            return response.data.id
        }).catch(err =>{
            dispatch({type: Contest_Card_Types.ACTION_FAIL})
            return false
        }).then(value =>{
            if(value){
                if(!isBrand){
                    AppendContest(dispatch, {...contest, participationId: value})
                }
                SuccessAlert(dispatch, "Action Done!")
            }else{
                FailAlert(dispatch, "Action Fail")
            }
            return value
        })
}
export const SetActionText = (dispatch, id, text, type, index)=>{
    try{
        dispatch({type: Contest_Card_Types.SET_ACTION_TEXT, payload: {id, text, type, index}})
    }catch{
        dispatch({type: Contest_Card_Types.SET_CONTEST_CARD_DATA_FAIL})
    }
}