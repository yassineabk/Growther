import axios from "axios"
import { Contest_Card_Types } from "./contest-card-types"
export const SetData = (dispatch, title, description, id) =>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        } 
    }
    axios.get(`https://staging-backendapp.herokuapp.com/api/contests/${title}/${description}/${id}`, config).then(response =>{
        dispatch({type: Contest_Card_Types.SET_CONTEST_STATE, payload: response.data})
    }).catch(err =>{
        dispatch({type: Contest_Card_Types.CONTEST_CARD_ERROR})
    })
}
export const SetDataFromLocation = (dispatch, data)=>{
    dispatch({type: Contest_Card_Types.SET_CONTEST_STATE, payload: data})
}
export const SelectAction = (dispatch, provider, index)=>{
    dispatch({type: Contest_Card_Types.SELECTED_ACTION, payload: {provider, index}})
}