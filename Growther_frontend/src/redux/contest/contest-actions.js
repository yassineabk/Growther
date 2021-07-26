import { ContestTypes } from "./contest-types";
import axios from "axios"
export const InitState = (dispatch)=>{
    dispatch({type: ContestTypes.SET_INITIAL_STATE})
}
export const StateChange = (dispatch, data)=>{
    dispatch({type: ContestTypes.SET_STATE, payload: data})
}
export const PrizesChange = (dispatch, key, value)=>{
    dispatch({type: ContestTypes.SET_PRIZES, payload: {key, value}})
}
export const WinnersNumChange = (dispatch, key, value)=>{
    dispatch({type: ContestTypes.SET_WINNERS_NUM, payload: {key, value}})
}
export const RemovePrize = (dispatch, key, value)=>{
    dispatch({type: ContestTypes.REMOVE_PRIZE, payload: {key, value}})
}
export const AddAction = (dispatch, action)=>{
    dispatch({type: ContestTypes.ADD_ACTION, payload: action})
}
export const RemoveAction = (dispatch, actionName)=>{
    dispatch({type: ContestTypes.REMOVE_ACTION, payload: actionName})
}
export const UpdateAction = (dispatch, provider, key, value)=>{
    dispatch({type: ContestTypes.UPDATE_ACTION, payload: {provider, key, value}})
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
                    if(typeof(information.prizes) === "object"){
                        var res = {}
                        Object.keys(information.prizes).map(key =>{
                            if(typeof(information.prizes[key]) === "string" && information.prizes[key].length === 0){
                                res[key] = false
                            }
                        })
                        if(Object.keys(res).length > 0){
                            result.prizes = res
                        }
                    }
                default:
                    break
            }
        })
        validData = result
        isValidData = Object.keys(result).length === 0
        dispatch({type: ContestTypes.CHECK_DATA, payload: {validData, isValidData}})
        return isValidData
    }
    return false
}
export const SaveContest = (dispatch, actions)=>{
    var result = []
    if(Array.isArray(actions)){
        actions.map(item =>{
            if(typeof(item) === "object" &&  typeof(item.actions) === "object"){
                var res = {provider: item.provider, actions: {}}
                Object.keys(item.actions).map(key=>{
                    if(typeof(item.actions[key]) === "object"){
                        res.actions[key] = {}
                        Object.keys(item.actions[key]).map(key2 =>{
                            res.actions[key][key2] = true
                            if(key2 === "link" && !UrlValidation(item.actions[key][key2]) && item.actions[key][key2] !== ""){
                                res.actions[key][key2] = false
                            }else if(key2 === "points" && (item.actions[key][key2] < 1 || item.actions[key][key2] > 5)){
                                res.actions[key][key2] = false
                            }
                        })
                    }
                })
                result = [...result, res]
            }
        })
        var isValidActions = ()=>{
            var isValid = true;
            for(var i = 0; i < result.length; i++){
                for(var item in result[i].actions){
                    if(!result[i].actions[item].link || !result[i].actions[item].points){
                        isValid = false;
                        break;
                    }
                }
                if(!isValid) break;
            }
            if(!isValid) alert("Please, Check the data you entred")
            return isValid
        }
        var isValid = isValidActions()
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
export const PublishContest = (dispatch, data)=>{
    var validInfos = NextStep(dispatch, data.information)
    var validActions = SaveContest(dispatch, data.actions)
    var published = false
    if(validInfos && validActions){
        axios.post("PUBLISH_URL", data)
        .then(response =>{
            dispatch({type: ContestTypes.PUBLISH_SUCCESS})
            published = true
        }).catch(err => {
            dispatch({type: ContestTypes.PUBLISH_FAIL})
            published = false
        })
    }
    return published
}





var UrlValidation = (url)=>{
    var pattern = new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/)
    if(!pattern.test(url)){
        return false
    }
    return true
}