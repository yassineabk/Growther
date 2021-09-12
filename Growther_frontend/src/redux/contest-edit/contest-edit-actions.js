import { CONTEST_EDIT_TYPES } from "./contest-edit-types";
import axios from "axios"
import { BACKEND_API } from "../../services/links";
import { AppendEditedContest } from "../contests/contests-actions";
import { FailAlert, SuccessAlert } from "../alert/alert-actions";
export const SetInitialState = (dispatch)=>{
    try{
        dispatch({type: CONTEST_EDIT_TYPES.INIT_EDIT_STATE})
    }catch{
        FailAlert(dispatch, "Something Went Wrong")
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_ERROR})
    }
}
export const SetStateToEdit = async (dispatch, id, userId)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        } 
    }
    dispatch({type: CONTEST_EDIT_TYPES.EDIT_LOADING})
    return axios.get(`${BACKEND_API}/api/contests/${id}`, config).then(response =>{
        if(response.data.user !== null && typeof(response.data.user) === "object" && response.data.user.id.toString() === userId.toString()){
            dispatch({type: CONTEST_EDIT_TYPES.SET_STATE_TO_EDIT, payload: response.data})
            return true
        }else{
            dispatch({type: CONTEST_EDIT_TYPES.EDIT_FAIL})
            return false
        }
    }).catch(err=>{
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_FAIL})
        return false
    }).then(value =>{
        if(value){
            SuccessAlert(dispatch, "get_contest_successfully")
        }else{
            FailAlert(dispatch, "get_contest_failure")
        }
        return value
    })
}
export const SetStateToEditFromLocation = async (dispatch, data, userId)=>{
    try{
        if(data.user.id.toString() === userId.toString()){
            dispatch({type: CONTEST_EDIT_TYPES.SET_STATE_TO_EDIT, payload: data})
            SuccessAlert(dispatch, "get_contest_successfully")
            return true
        }
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_FAIL})
        FailAlert(dispatch, "get_contest_failure")
        return false
    }catch{
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_ERROR})
        FailAlert(dispatch, "get_contest_failure")
        return false
    }
    
}
export const EditState = (dispatch, information, id, targetId) =>{
    try{
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_STATE, payload: {data: information, targetId}})
    }catch{
        FailAlert(dispatch, "something_went_wrong")
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_ERROR})
    }
}
export const EditDuration = (dispatch, type, value, startDate, endDate) =>{
    try{
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_DURATION, payload: {value, type, startDate, endDate}})
    }catch{
        FailAlert(dispatch, "something_went_wrong")
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_ERROR})
    }
}
export const EditSelectedAction = (dispatch, provider, index)=>{
    try{
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_PREVIEW_SELECTED_ACTION, payload: {provider, index}})
    }catch{
        FailAlert(dispatch, "something_went_wrong")
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_ERROR})
    }
}
export const CheckEdits = (dispatch, information) =>{
    var data = information
    try{
        if(typeof(data) === "object"){
            var result = {}
            var validData = {}
            var isValidData = true
            Object.keys(data).map(key=>{
                var dateStart, dateEnd;
                switch(key){
                    case "title":
                        if(data["title"] === null || (typeof(data["title"]) === "string" && data["title"].trim().length === 0)){
                            result["title"] = false
                        }
                        break
                    case "description":
                        if(data["description"] === null || (typeof(data["description"]) === "string" && data["description"].trim().length === 0)){
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
                            dateStart = new Date(data.startDate)
                            dateEnd = new Date(data.endDate)
                            if(dateStart >= dateEnd){
                                result["endDate"] = false
                            }
                        }
                        break
                    case "endTime":
                        if(data["endTime"] === null || (typeof(data["endTime"]) === "string" && data["endTime"].length === 0)){
                            result["endTime"] = false
                        }else{
                            var currentDate = new Date()
                            var currentHour = currentDate.getHours()
                            var currentMin = currentDate.getMinutes()
                            var currentDay = ("0"+currentDate.getDate()).slice(-2)
                            var currentMonth = ("0"+parseInt(currentDate.getMonth() + 1 === 13 ? 1 : currentDate.getMonth() + 1)).slice(-2)
                            var currentYear = currentDate.getFullYear()
                            var date = new Date(`${currentYear}-${currentMonth}-${currentDay}`)
                            var timeStart = data.startTime.split(":")
                            var timeEnd = data.endTime.split(":")
                            dateStart = new Date(data.startDate.split("T")[0])
                            dateEnd = new Date(data.endDate.split("T")[0])
                            var timediff = Math.abs(Math.ceil((dateEnd - dateStart)/(1000*60*60*24)))
                            var timediff2 = Math.ceil((dateEnd - date))
                            if(!Array.isArray(timeStart)){
                                result["endTime"] = false
                            }
                            if(Array.isArray(timeStart) && timeStart.length === 1){
                                result["endTime"] = false
                            }
                            if(timediff2 === 0){
                                if(parseInt(timeEnd[0]) === currentHour && parseInt(currentMin) > parseInt(timeEnd[1])){
                                    result["endTime"] = false
                                }
                                if(parseInt(currentHour) > parseInt(timeEnd[0])){
                                    result["endTime"] = false
                                }
                            }
                            if(timediff === 0){
                                if(parseInt(timeStart[0]) === parseInt(timeEnd[0]) && parseInt(timeStart[1]) > parseInt(timeEnd[1]) - 10){
                                    result["endTime"] = false
                                }
                                if(parseInt(timeStart[0]) > parseInt(timeEnd[0])){
                                    result["endTime"] = false
                                }
                            }
                        }
                        break
                    default:
                        break
                }
                return true
            })
            validData = result
            isValidData = Object.keys(result).length === 0
            dispatch({type: CONTEST_EDIT_TYPES.CHECK_EDITS, payload: {validData, isValidData}})
            return isValidData
        }
        FailAlert(dispatch, "invalid_data")
        return false
    }catch{
        FailAlert(dispatch, "something_went_wrong")
        return false
    }
}
export const Edit = async (dispatch, information, id, userId)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        } 
    }
    dispatch({type: CONTEST_EDIT_TYPES.EDIT_LOADING})
    if(typeof(information) === "object" && information.user !== null && information.user.id.toString() === userId.toString()){
        var Data = {}
        Object.keys(information).map(key => {
            Data[key] = information[key] 
            return true
        })
        Data = {
            ...Data, 
            endDate: information.endDate.split("T")+"T"+information.endTime,
            startDate: information.startDate.split("T")+"T"+information.startTime
        }
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_LOADING})
        return axios.put(`${BACKEND_API}/api/contests/update/${id}`, Data, config)
        .then(response =>{
            dispatch({type: CONTEST_EDIT_TYPES.EDIT_SUCCESS})
            return response.data
        }).catch(err =>{
            dispatch({type: CONTEST_EDIT_TYPES.EDIT_FAIL})
            return false
        }).then(value =>{
            if(value){
                AppendEditedContest(dispatch, id, Data)
                SuccessAlert(dispatch, "succesfully_updated")
            }else{
                FailAlert(dispatch, "update_failure")
            }
        })
    }
    dispatch({type: CONTEST_EDIT_TYPES.EDIT_FAIL})
    FailAlert(dispatch, "invalid_data")
    return false
}