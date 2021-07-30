import { ContestTypes } from "./contest-types";
import axios from "axios"
export const InitState = (dispatch)=>{
    dispatch({type: ContestTypes.SET_INITIAL_STATE})
}
export const StateChange = (dispatch, data)=>{
    dispatch({type: ContestTypes.SET_NEW_CONTEST_STATE, payload: data})
}
export const PrizesChange = (dispatch, id, value)=>{
    dispatch({type: ContestTypes.SET_PRIZES, payload: {id, value}})
}
export const WinnersNumChange = (dispatch, id, value)=>{
    dispatch({type: ContestTypes.SET_WINNERS_NUM, payload: {id, value}})
}
export const RemovePrize = (dispatch, id, value)=>{
    dispatch({type: ContestTypes.REMOVE_PRIZE, payload: {id, value}})
}
export const AddAction = (dispatch, action)=>{
    dispatch({type: ContestTypes.ADD_ACTION, payload: action})
}
export const RemoveAction = (dispatch, actionName, index)=>{
    dispatch({type: ContestTypes.REMOVE_ACTION, payload: {actionName, index}})
}
export const UpdateAction = (dispatch, provider, key, value, index)=>{
    dispatch({type: ContestTypes.UPDATE_ACTION, payload: {provider, key, value, index}})
}
export const SetDuration = (dispatch, type, value, startDate, endDate)=>{
    dispatch({type: ContestTypes.SET_DURATION, payload: {value, type, startDate, endDate}})
}
export const NextStep = (dispatch, information)=>{
    if(typeof(information) === "object"){
        var data = information
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
                case "startDate":
                    if(data["startDate"] === null || (typeof(data["startDate"]) === "string" && data["startDate"].length === 0)){
                        result["startDate"] = false
                    }else{
                        var dateStart = new Date(data.startDate)
                        var dateEnd = new Date(data.endDate)
                        var currentDate = new Date()
                        if(dateStart >= dateEnd || dateStart < currentDate){
                            result["startDate"] = false
                        }
                    }
                    break
                case "endDate":
                    if(data["endDate"] === null || (typeof(data["endDate"]) === "string" && data["endDate"].length === 0)){
                        result["endDate"] = false
                    }else{
                        var dateStart = new Date(data.startDate)
                        var dateEnd = new Date(data.endDate)
                        var currentDate = new Date()
                        if(dateStart >= dateEnd || dateEnd < currentDate){
                            result["endDate"] = false
                        }
                    }
                    break
                case "prizes":
                    if(Array.isArray(information.prizes)){
                        var res = []
                        information.prizes.map(item =>{
                            if(typeof(item) === "object" && typeof(item.description) === "string" && item.description === ""){
                                res = [...res, {id: item.id, description: false}]
                            }else{
                                res = [...res, {id: item.id, description: true}]
                            }
                        })
                        if(res.length > 0){
                            result.prizes = res
                        }
                    }
                default:
                    break
            }
        })
        validData = result
        var isValidPrizes = ()=>{
            var isValid = true
            if(Array.isArray(result.prizes)){
                for(var i = 0; i < result.prizes.length; i++){
                    if(!result.prizes[i].description){
                        isValid = false
                        break
                    }
                }
            }else{
                isValid = false
            }
            return isValid
            
        }
        isValidData = Object.keys(result).length === 1 && isValidPrizes()
        dispatch({type: ContestTypes.CHECK_DATA, payload: {validData, isValidData}})
        return isValidData
    }
    return false
}
export const SaveContestPrizes = async (dispatch, prizes, isValidData, id)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        } 
    }
    if(isValidData){
        return axios.post(`http://localhost:5000/api/contests/${id}/prizes`, prizes, config)
            .then(response =>{
                dispatch({type: ContestTypes.PRIZES_STEP_SAVED})
                return true
            }).catch(err =>{
                dispatch({type: ContestTypes.PRIZES_STEP_FAIL})
                return false
            })
    }
    dispatch({type: ContestTypes.PRIZES_STEP_FAIL})
    return false
}

export const SaveContestFirstStep = async (dispatch, information, isValidData)=>{
    if(isValidData){
        var token = localStorage.getItem("accessToken")
        var config = {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
        }
        var Data = {}
        Object.keys(information).map((key, index) =>{
            if(key !== "prizes" && key !== "actions"){
                Data[key] = information[key]
            }
        })
        return axios.post("http://localhost:5000/api/contests/create", Data, config)
            .then(response =>{
                dispatch({type: ContestTypes.SET_NEW_CONTEST_USER, payload: response.data})
                return response.data
            })/*.then(id =>{
                if(typeof(id) === "number"){
                    SaveContestPrizes(dispatch, information.prizes, isValidData, id).then(value =>{
                        console.log(value, "here")
                        return value
                    })
                    return true
                }
                return false
            })*/.catch(err =>{
                    dispatch({type: ContestTypes.INFOS_STEP_FAIL})
                    return false
                })
    }
    dispatch({type: ContestTypes.INFOS_STEP_FAIL})
    return false
}
export const SaveContest = (dispatch, actions)=>{
    var result = []
    if(Array.isArray(actions) && actions.length > 0){
        actions.map((item, index) =>{
            if(typeof(item) === "object"){
                var res = {isValid: true, provider: item.provider, index: index}
                Object.keys(item).map(key=>{
                    if(key === "url" && !UrlValidation(item[key])){
                        res = {...res, [key]: false, isValid: false}
                    }
                    if(key === "points" && (item[key] < 1 || item[key] > 5)){
                        res = {...res, [key]: false, isValid: false}
                    }
                })
                result = [...result, res]
            }
        })
        var validActions = ()=>{
            var IsValid = true
            for(var i = 0; i < result.length; i++){
                if(!result[i].isValid){
                    IsValid = false
                    break
                }
            }
            return IsValid
        }
        var isValid = validActions()
        dispatch({type: ContestTypes.CHECK_ACTIONS, payload: {validActions: result, isValidActions: isValid}})
        return isValid
    }
    return false
}
export const PreviewSelectedAction = (dispatch, provider, index)=>{
    dispatch({type: ContestTypes.PREVIEW_SELECTED_ACTIONS, payload: {provider, index}})
}
export const SaveDraft = (dispatch, data)=>{
    axios.post("DRAFT_URL", data)
        .then(response =>{
            dispatch({type: ContestTypes.SAVE_DRAFT})
        }).catch(err => {
            dispatch({type: ContestTypes.PUBLISH_FAIL})
        })
}
export const PublishContest = async (dispatch, data)=>{
    var validInfos = NextStep(dispatch, data.information)
    var validActions = SaveContest(dispatch, data.actions)
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        } 
    }
    if(validInfos && validActions){
        return axios.post(`http://localhost:5000/api/contests/create`, data.information ,config)
            .then(response =>{
                dispatch({type: ContestTypes.PUBLISH_SUCCESS, payload: `http://localhost:3000/contest/${data.information.title}/${data.information.description}/${response.data}`})
                return true
            }).catch(err => {
                dispatch({type: ContestTypes.PUBLISH_FAIL})
                return false
            })
    }
    dispatch({type: ContestTypes.PUBLISH_FAIL})
    return false
}





var UrlValidation = (url)=>{
    var pattern = new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/)
    if(!pattern.test(url)){
        return false
    }
    return true
}