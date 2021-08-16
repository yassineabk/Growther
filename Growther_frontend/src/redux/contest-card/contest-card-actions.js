import axios from "axios"
import { BACKEND_API } from "../../services/links"
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
    axios.get(`${BACKEND_API}/api/contests/${title}/${id}`, config)
        .then(response =>{
            dispatch({type: Contest_Card_Types.SET_CONTEST_STATE, payload: response.data})
        }).catch(err =>{
            dispatch({type: Contest_Card_Types.CONTEST_CARD_ERROR})
            ShowErrorModal(dispatch, "Couldn't get this contest please try again later")
        })
}
export const SetDataFromLocation = (dispatch, data)=>{
    dispatch({type: Contest_Card_Types.SET_CONTEST_STATE, payload: data})
}
export const SelectAction = (dispatch, provider, index)=>{
    dispatch({type: Contest_Card_Types.SELECTED_ACTION, payload: {provider, index}})
}
export const OpenActionModal = (dispatch, index, element)=>{
    dispatch({type: Contest_Card_Types.DO_ACTION, payload: element !== null && typeof(element) === "object" ? {element, index} : {}})
}
export const CloseActionModal = (dispatch)=>{
    dispatch({type: Contest_Card_Types.CLOSE_MODAL})
}
export const ActionDone = async (dispatch, action, id, index, points, idContest)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
    }
    var participationActions = {}
    Object.keys(action).map(key=>{
        if(!["id", "index", "points"].includes(key)){
            participationActions[key] = action[key]
        }
    })
    var data = {
        partipationDate: new Date().toUTCString(),
        participationActions: [participationActions]
    }
    return axios.post(`${BACKEND_API}/api/participations/create/${idContest}`, data, config)
        .then(response =>{
            dispatch({type: Contest_Card_Types.ACTION_DONE, payload: {id, index, points}})
            return true
        }).catch(err =>{
            dispatch({type: Contest_Card_Types.ACTION_FAIL})
            return false
        })
}
export const SetActionText = (dispatch, id, text, type, index)=>{
    dispatch({type: Contest_Card_Types.SET_ACTION_TEXT, payload: {id, text, type, index}})
}