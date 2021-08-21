import { ContestTypes } from "./contest-types";
import axios from "axios"
import { AppendDraft } from "../contests/contests-actions";
import { BACKEND_API, FRONTEND_API } from "../../services/links";
import { ShowErrorModal } from "../errors/errors-actions";
export const InitState = (dispatch)=>{
    try{    
        var date =  new Date()
        var days = ("0" + parseInt(new Date(date.setDate(date.getDate())).getDate())).slice(-2)
        var days2 = ("0" + parseInt(new Date(date.setDate(parseInt(days) + 1)).getDate())).slice(-2)
        var months = ("0" + parseInt(date.getMonth() === 13 + 1 ? 1 : date.getMonth() + 1))
        var year = date.getFullYear()
        var startDate = year + "-" + months + "-" + days
        var endDate = year + "-" + months + "-" + days2
        var startHour = ("0"+date.getHours()).slice(-2)
        var startMin = ("0"+date.getMinutes()).slice(-2)
        var endMin =  parseInt(startMin) + 10 
        var endHour = endMin > 59 ?  parseInt(startHour) + 1 : parseInt(startHour)
        endMin = endMin > 59 ? ("0" + parseInt(parseInt(startMin) - 60 + 10)).slice(-2) : ("0" + parseInt(parseInt(startMin) + 10)).slice(-2)
        endHour = endHour > 23 ? ("0" + parseInt(startHour - 24)).slice(-2) : ("0" + parseInt(startHour)).slice(-2)
        var startTime =  startHour + ":" + startMin
        var endTime = endHour + ":" + endMin
        var timeZone = date.getTimezoneOffset() //Intl.DateTimeFormat().resolvedOptions().timeZone
        dispatch({type: ContestTypes.SET_INITIAL_STATE, payload: {startDate, endDate, startTime, endTime, timeZone}})
    }catch(err){
        dispatch({type: ContestTypes.SET_NEW_CONTEST_DATA_FAIL})
    }
}
export const StateChange = (dispatch, data, targetId)=>{
    try{
        dispatch({type: ContestTypes.SET_NEW_CONTEST_STATE, payload: {data, targetId}})
    }catch(err){
        dispatch({type: ContestTypes.SET_NEW_CONTEST_DATA_FAIL})
    }
}
export const PrizesChange = (dispatch, id, value)=>{
    try{
        dispatch({type: ContestTypes.SET_PRIZES, payload: {id, value}})
    }catch(err){
        dispatch({type: ContestTypes.SET_NEW_CONTEST_DATA_FAIL})
    }
}
export const SetImmediately = (dispatch, value) =>{
    try{
        if(value === true){
            dispatch({type: ContestTypes.SET_IMMEDIATELY, payload: false})
        }else{
            dispatch({type: ContestTypes.SET_IMMEDIATELY, payload: true})
        }
    }catch(err){
        dispatch({type: ContestTypes.SET_NEW_CONTEST_DATA_FAIL})
    }
}
export const WinnersNumChange = (dispatch, id, value)=>{
    try{
        if(value > 10){
            value = 10
        }
        if(value < 1){
            value = 1
        }
        dispatch({type: ContestTypes.SET_WINNERS_NUM, payload: {id, value}})
    }catch(err){
        dispatch({type: ContestTypes.SET_NEW_CONTEST_DATA_FAIL})
    }
    
}
export const RemovePrize = (dispatch, id, value)=>{
    try{
        dispatch({type: ContestTypes.REMOVE_PRIZE, payload: {id, value}})
    }catch{
        dispatch({type: ContestTypes.SET_NEW_CONTEST_DATA_FAIL})
    }
}
export const AddAction = (dispatch, action)=>{
    try{
        dispatch({type: ContestTypes.ADD_ACTION, payload: action})
    }catch{
        dispatch({type: ContestTypes.SET_NEW_CONTEST_DATA_FAIL})
    }
}
export const RemoveAction = (dispatch, actionName, index)=>{
    try{
        dispatch({type: ContestTypes.REMOVE_ACTION, payload: {actionName, index}})
    }catch{
        dispatch({type: ContestTypes.SET_NEW_CONTEST_DATA_FAIL})
    }
}
export const UpdateAction = (dispatch, provider, key, value, index)=>{
    try{
        dispatch({type: ContestTypes.UPDATE_ACTION, payload: {provider, key, value, index}})
    }catch{
        dispatch({type: ContestTypes.SET_NEW_CONTEST_DATA_FAIL})
    }
}
export const SetTime = (dispatch, value)=>{
    try{
        dispatch({type: ContestTypes.SET_TIME, payload: value})
    }catch{
        dispatch({type: ContestTypes.SET_NEW_CONTEST_DATA_FAIL})
    }
}
export const SetDuration = (dispatch, type, value, startDate, endDate)=>{
    try{
        dispatch({type: ContestTypes.SET_DURATION, payload: {value, type, startDate, endDate}})
    }catch{
        dispatch({type: ContestTypes.SET_NEW_CONTEST_DATA_FAIL})
    }
}
export const NextStep = (dispatch, information)=>{
    try{
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
                            var dateStart = new Date(data.startDate.split("T")[0])
                            var dateEnd = new Date(data.endDate.split("T")[0])
                            var currentDate = new Date()
                            var currentDay = ("0"+currentDate.getDate()).slice(-2)
                            var currentMonth = ("0"+parseInt(currentDate.getMonth()+1 === 13 ? 1 : currentDate.getMonth()+1))
                            var currentYear = currentDate.getFullYear()
                            var date = new Date(currentYear + "-" + currentMonth + "-" + currentDay)
                            if(dateEnd - dateStart < 0 || dateStart - date < 0){
                                result["startDate"] = false
                            }
                        }
                        break
                    case "endDate":
                        if(data["endDate"] === null || (typeof(data["endDate"]) === "string" && data["endDate"].length === 0)){
                            result["endDate"] = false
                        }else{
                            var dateStart = new Date(data.startDate.split("T")[0])
                            var dateEnd = new Date(data.endDate.split("T")[0])
                            var currentDate = new Date()
                            var currentDay = ("0"+currentDate.getDate()).slice(-2)
                            var currentMonth = ("0"+parseInt(currentDate.getMonth()+1 === 13 ? 1 : currentDate.getMonth()+1))
                            var currentYear = currentDate.getFullYear()
                            var date = new Date(currentYear + "-" + currentMonth + "-" + currentDay)
                            if(dateEnd - dateStart < 0 || dateEnd -  date < 0){
                                result["endDate"] = false
                            }
                        }
                        break
                    case "startTime":
                        if(data.immediately === false){
                            if(data["startTime"] === null || (typeof(data["startTime"]) === "string" && data["startTime"].length === 0)){
                                result["startTime"] = false
                            }else{
                                var currentDate = new Date()
                                var currentHour = currentDate.getHours()
                                var currentMin = currentDate.getMinutes()
                                var timeStart = data.startTime.split(":")
                                var timeEnd = data.endTime.split(":")
                                var dateStart = new Date(data.startDate)
                                var dateEnd = new Date(data.endDate)
                                var timediff = Math.abs(Math.ceil((dateEnd - dateStart)/(1000*60*60*24)))
                                if(!Array.isArray(timeStart)){
                                    return result["startTime"] = false
                                }
                                if(Array.isArray(timeStart) && timeStart.length === 1){
                                    return result["startTime"] = false
                                }
                                if(timediff === 0){
                                    if(parseInt(timeStart[0]) === parseInt(timeEnd[0]) && parseInt(timeStart[1]) > parseInt(timeEnd[1]) - 10){
                                        return result["startTime"] = false
                                    }
                                    if(parseInt(timeStart[0]) > parseInt(timeEnd[0])){
                                        return result["startTime"] = false
                                    }
                                }
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
                            var timeStart = data.startTime.split(":")
                            var timeEnd = data.endTime.split(":")
                            var dateStart = new Date(data.startDate)
                            var dateEnd = new Date(data.endDate)
                            var timediff = Math.abs(Math.ceil((dateEnd - dateStart)/(1000*60*60*24)))
                            if(!Array.isArray(timeStart)){
                                return result["endTime"] = false
                            }
                            if(Array.isArray(timeStart) && timeStart.length === 1){
                                return result["endTime"] = false
                            }
                            if(timediff === 0){
                                if(parseInt(timeStart[0]) === parseInt(timeEnd[0]) && parseInt(timeStart[1]) > parseInt(timeEnd[1]) - 10){
                                    return result["endTime"] = false
                                }
                                if(parseInt(timeStart[0]) > parseInt(timeEnd[0])){
                                    return result["endTime"] = false
                                }
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
    }catch{
        return false
    }
}
export const SaveContest = (dispatch, actions)=>{
    var result = []
    var TextActions = ["tweet", "answer question", "submit url", "submit video", "submit", "subscribe to newsletter", "write a blog post"]
    try{
        if(Array.isArray(actions) && actions.length > 0){
            actions.map((item, index) =>{
                if(item !== null && typeof(item) === "object"){
                    var res = {isValid: true, provider: item.provider, index: index}
                    if(item.isDiscord && item.provider.toLowerCase() === "discord"){
                        var tokenBot = localStorage.getItem("discordBotToken")
                        if(tokenBot === null || !tokenBot){
                            res = {...res, isValid: false, isDiscord: false}
                        }
                    }
                    Object.keys(item).map(key=>{
                        if(key === "url"){
                            if(!TextActions.includes(item.type.toLowerCase())){
                                if(!UrlValidation(item[key])){
                                    res = {...res, [key]: false, isValid: false}
                                }
                            }
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
    }catch{
        return false
    }
}
export const PreviewSelectedAction = (dispatch, provider, index)=>{
    try{
        dispatch({type: ContestTypes.PREVIEW_SELECTED_ACTIONS, payload: {provider, index}})
    }catch{
        dispatch({type: ContestTypes.SET_NEW_CONTEST_DATA_FAIL})
    }
}
export const SaveDraft = (dispatch, data, id)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
    }
    dispatch({type: ContestTypes.NEW_CONTEST_LOADING})
    axios.post(`${BACKEND_API}/api/contests/create/draft`, data, config)
        .then(response =>{
            dispatch({type: ContestTypes.SAVE_DRAFT})
            return response.data
        }).catch(err => {
            dispatch({type: ContestTypes.PUBLISH_FAIL})
            //ShowErrorModal(dispatch, "Couldn't save this contest as a draft, please try again later")
            return false
        }).then(value =>{
            if(value){
                AppendDraft(dispatch, data, value, id)
            }
        })
}
export const EditDraft = (dispatch, data, id)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
    }
    dispatch({type: ContestTypes.NEW_CONTEST_LOADING})
    axios.put(`${BACKEND_API}/api/contests/update/draft/${id}`, data, config)
        .then(response =>{
            dispatch({type: ContestTypes.SAVE_DRAFT})
            return response.data
        }).catch(err => {
            dispatch({type: ContestTypes.PUBLISH_FAIL})
            //ShowErrorModal(dispatch, "Couldn't save this contest as a draft, please try again later")
            return false
        }).then(value =>{
            if(value){
                AppendDraft(dispatch, data, value, id)
            }
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
    dispatch({type: ContestTypes.NEW_CONTEST_LOADING})
    if(validInfos && validActions){
        return axios.post(`${BACKEND_API}/api/contests/create`, data.information ,config)
            .then(response =>{
                dispatch({type: ContestTypes.PUBLISH_SUCCESS, payload: `${FRONTEND_API}/contest/${data.information.title}/${response.data}`})
                return response.data
            }).catch(err => {
                console.log(err.response)
                dispatch({type: ContestTypes.PUBLISH_FAIL})
                //ShowErrorModal(dispatch, "Please try again later")
                return false
            })
    }
    dispatch({type: ContestTypes.PUBLISH_FAIL})
    //ShowErrorModal(dispatch, "Please, check data you entred")
    return false
}
export const DuplicateContest = (dispatch, id, data)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        } 
    }
    dispatch({type: ContestTypes.NEW_CONTEST_LOADING})
    axios.get(`${BACKEND_API}/api/contests/draft/${id}`, config).then(response =>{
        dispatch({type: ContestTypes.DUPLICATE_CONTEST})
        return response.data
    }).catch(err=>{
        dispatch({type: ContestTypes.PUBLISH_FAIL})
        //ShowErrorModal(dispatch, "Couldn't duplicate this contest please try again later")
        return false
    }).then(value => {
        if(value){
            AppendDraft(dispatch, data, id)
        }
    })
}
export const ResestNewContest = (dispatch)=>{
    dispatch({type: ContestTypes.RESET_NEW_CONTEST})
}
export const UrlValidation = (url)=>{
    var pattern = new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/)
    if(!pattern.test(url)){
        return false
    }
    return true
}