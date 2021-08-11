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
    axios.get(`${BACKEND_API}/api/contests/${title}/${id}`, config).then(response =>{
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
    dispatch({type: Contest_Card_Types.DO_ACTION, payload: element !== null && typeof(element) === "object" ? {...element, index: index} : {}})
}
export const CloseActionModal = (dispatch)=>{
    dispatch({type: Contest_Card_Types.CLOSE_MODAL})
}
export const ActionDone = (dispatch, id, index, points)=>{
    dispatch({type: Contest_Card_Types.ACTION_DONE, payload: {id, index, points}})
}