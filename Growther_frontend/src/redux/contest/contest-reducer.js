import { ContestTypes } from "./contest-types";

const INITIAL_STATE={
    information:{
        title: "",
        description: "",
        winnersNbr: 1,
        startDate: "",
        endDate: "",
        duration: {
            type: "days",
            value: 1
        },
        maxParticipants: 0,
        prizes: {
            prize0: ""
        },
    },
    actions: [],
    validData: {},
    isValidData: false,
    validActions: [],
    isValidActions: false,
}

const contestReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case ContestTypes.SET_INITIAL_STATE:{
            return INITIAL_STATE
        }
        case ContestTypes.SET_STATE:
            return {
                ...state,
                information:{
                    ...action.payload,
                },
                actions:[
                    ...state.actions
                ]
            }
        case ContestTypes.SET_WINNERS_NUM:
            return{
                ...state,
                information:{
                    ...state.information,
                    winnersNbr: action.payload.value,
                    prizes: {
                        ...state.information.prizes,
                        [action.payload.key]: ""
                    }
                }
            }
        case ContestTypes.SET_PRIZES:
            return{
                ...state,
                information:{
                    ...state.information,
                    prizes: {
                        ...state.information.prizes,
                        [action.payload.key]: action.payload.value
                    }
                }
            }
        case ContestTypes.REMOVE_PRIZE:
            return{
                ...state,
                information: {
                    ...state.information,
                    winnersNbr: action.payload.value,
                    prizes: Object.keys(state.information.prizes).reduce((object, key)=>{
                        if(key !== action.payload.key){
                            object[key] = state.information.prizes[key]
                        }
                        return object
                    }, {})
                }
            }
        case ContestTypes.SET_DURATION:
            return {
                ...state,
                information:{
                    ...state.information,
                    duration: {
                        value: action.payload.value,
                        type: action.payload.type
                    }
                }
            }
        case ContestTypes.ADD_ACTION:
            if(state.actions === undefined) return{
                ...state,
                actions: [action.payload]
            }

            var filtred = state.actions.filter(
                item => item.provider === action.payload.provider
            )

            return {
                ...state,
                actions: filtred.length === 0 ?
                    [...state.actions, action.payload] : [...state.actions]
            }
        case ContestTypes.REMOVE_ACTION:  
            return {
                ...state,
                actions: state.actions.filter(item => item.provider !== action.payload)
            }
        case ContestTypes.UPDATE_ACTION:
            return {
                ...state,
                actions: state.actions.map((item, index)=>{
                    if(item.provider === action.payload.provider){
                        if(action.payload.key === "action"){
                            return {
                                ...item,
                                active: action.payload.value
                            }
                        }else{
                            return {
                                ...item,
                                actions: {
                                    ...item.actions,
                                    [item.active]: {
                                        ...item.actions[item.active],
                                        [action.payload.key]: action.payload.value
                                    }
                                }
                            }
                        }
                        
                    }
                    return {
                        ...item
                    }
                })
            }
        case ContestTypes.CHECK_DATA:
            var data = state.information
            var result = {}
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
                            if(dateStart > dateEnd || dateStart < currentDate){
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
                            if(dateStart > dateEnd || dateEnd < currentDate){
                                result["endDate"] = false
                            }
                        }
                        break
                    default:
                        break
                }
            })
            return{
                ...state,
                validData: result,
                isValidData: Object.keys(result).length === 0
            }
        case ContestTypes.CHECK_ACTIONS:
            var result = []
            if(Array.isArray(state.actions)){
                state.actions.map(item =>{
                    if(typeof(item) === "object" &&  typeof(item.actions) === "object"){
                        var res = {provider: item.provider, actions: {}}
                        Object.keys(item.actions).map(key=>{
                            if(typeof(item.actions[key]) === "object"){
                                res.actions[key] = {}
                                Object.keys(item.actions[key]).map(key2 =>{
                                    res.actions[key][key2] = true
                                    if(key2 === "link" && !UrlValidation(item.actions[key][key2])){
                                        res.actions[key][key2] = false
                                    }else if(key2 === "points" && item.actions[key][key2] < 1){
                                        res.actions[key][key2] = false
                                    }
                                })
                            }
                        })
                        result = [...result, res]
                    }
                })
            }
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
                return isValid
            }
            return {
                ...state,
                validActions: result,
                isValidActions: isValidActions()
            }
        case ContestTypes.RESET_VALIDATION:
            return {
                ...state,
                validData: {},
                isValidData: false
            }
        default:
            return state;
    }



}

var UrlValidation = (url)=>{
    var pattern = new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/)
    if(!pattern.test(url)){
        return false
    }
    return true
}
export default contestReducer;