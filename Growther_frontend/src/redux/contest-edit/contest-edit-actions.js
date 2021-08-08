import { CONTEST_EDIT_TYPES } from "./contest-edit-types";
import axios from "axios"
import { BACKEND_API } from "../../services/links";
import { AppendEditedContest } from "../contests/contests-actions";
import { ShowErrorModal } from "../errors/errors-actions";
export const SetInitialState = (dispatch)=>{
    dispatch({type: CONTEST_EDIT_TYPES.INIT_EDIT_STATE})
}
export const SetStateToEdit = async (dispatch, id, userId)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        } 
    }
    return axios.get(`${BACKEND_API}/api/contests/${id}`, config).then(response =>{
        if(response.data.user !== null && typeof(response.data.user) === "object" && response.data.user.id.toString() === userId.toString()){
            dispatch({type: CONTEST_EDIT_TYPES.SET_STATE_TO_EDIT, payload: response.data})
            return true
        }else{
            dispatch({type: CONTEST_EDIT_TYPES.EDIT_FAIL})
            ShowErrorModal(dispatch, "Please make sure this contest is yours")
            return false
        }
    }).catch(err=>{
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_FAIL})
        ShowErrorModal(dispatch, "Please make sure this contest exist")
        return false
    })
}
export const SetStateToEditFromLocation = async (dispatch, data, userId)=>{
    if(data.user.id.toString() === userId.toString()){
        dispatch({type: CONTEST_EDIT_TYPES.SET_STATE_TO_EDIT, payload: data})
        return true
    }
    dispatch({type: CONTEST_EDIT_TYPES.EDIT_FAIL})
    return false
}
export const EditState = (dispatch, information, id) =>{
    dispatch({type: CONTEST_EDIT_TYPES.EDIT_STATE, payload: information})
}
export const EditDuration = (dispatch, type, value, startDate, endDate) =>{
    dispatch({type: CONTEST_EDIT_TYPES.EDIT_DURATION, payload: {value, type, startDate, endDate}})
}
export const EditSelectedAction = (dispatch, provider, index)=>{
    dispatch({type: CONTEST_EDIT_TYPES.EDIT_PREVIEW_SELECTED_ACTION, payload: {provider, index}})
}
export const CheckEdits = (dispatch, information) =>{
    var data = information
    if(typeof(data) === "object"){
        var result = {}
        var validData = {}
        var isValidData = true
        Object.keys(data).map(key=>{
            switch(key){
                case "title":
                    if(data["title"] === null || (typeof(data["title"]) === "string" && data["title"].length === 0)){
                        result["title"] = false
                    }
                    break
                case "description":
                    if(data["description"] === null || (typeof(data["description"]) === "string" && data["description"].length === 0)){
                        result["description"] = false
                    }
                    break
                case "winnersNbr":
                    if(data["winnersNbr"] === null || data["winnersNbr"] < 1){
                        result["winnersNbr"] = false
                    }
                    break
                case "endDate":
                    if(data["endDate"] === null || (typeof(data["endDate"]) === "string" && data["endDate"].length === 0)){
                        result["endDate"] = false
                    }else{
                        var dateStart = new Date(data.startDate)
                        var dateEnd = new Date(data.endDate)
                        if(dateStart >= dateEnd){
                            result["endDate"] = false
                        }
                    }
                    break
                default:
                    break
            }
        })
        validData = result
        isValidData = Object.keys(result).length === 0
        dispatch({type: CONTEST_EDIT_TYPES.CHECK_EDITS, payload: {validData, isValidData}})
        return isValidData
    }
    return false
}
export const Edit = async (dispatch, information, id, userId)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        } 
    }
    if(typeof(information) === "object" && information.user.id.toString() === userId.toString()){
        var Data = {}
        Object.keys(information).map(key => {
            if(key !== "actions"){
                Data[key] = information[key] 
            }
        })
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_LOADING})
        return axios.put(`${BACKEND_API}/api/contests/update/${id}`, Data, config)
        .then(response =>{
            dispatch({type: CONTEST_EDIT_TYPES.EDIT_SUCCESS})
            return response.data
        }).catch(err =>{
            ShowErrorModal(dispatch, "Couldn't update your contest")
            dispatch({type: CONTEST_EDIT_TYPES.EDIT_FAIL})
            return false
        }).then(value =>{
            if(value){
                AppendEditedContest(dispatch, id, Data)
            }
        })
    }
    ShowErrorModal(dispatch, "Please check the data you entered")
    dispatch({type: CONTEST_EDIT_TYPES.EDIT_FAIL})
    return false
}