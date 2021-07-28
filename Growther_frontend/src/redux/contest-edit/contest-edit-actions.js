import { CONTEST_EDIT_TYPES } from "./contest-edit-types";
import axios from "axios"
var data = {
    "information": {
        "title": "Yassine Hijazi",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure do",
        "winnersNbr": 1,
        "startDate": "2021-07-27",
        "endDate": "2021-08-13",
        "duration": {
            "value": 17,
            "type": "days"
        },
        "maxReach": 8,
        "actions": [
            {
                "provider": "Youtube",
                "type": "View",
                "url": "https://www.youtube.com/id5",
                "points": 3,
                "listOfActions": [
                    "View",
                    "Like",
                    "Subscribe"
                ]
            },
            {
                "provider": "Youtube",
                "type": "View",
                "url": "https://www.youtube.com/id6",
                "points": 1,
                "listOfActions": [
                    "View",
                    "Like",
                    "Subscribe"
                ]
            },
            {
                "provider": "Youtube",
                "type": "View",
                "url": "https://www.youtube.com/id8",
                "points": 5,
                "listOfActions": [
                    "View",
                    "Like",
                    "Subscribe"
                ]
            }
        ],
        "prizes": [
            {
                id: 1,
                description: "PS5"
            }
        ]
    },
}
export const SetInitialState = (dispatch)=>{
    dispatch({type: CONTEST_EDIT_TYPES.INIT_EDIT_STATE})
}
export const SetStateToEdit = (dispatch, id)=>{
    axios.get(`/api/contests/update/${id}`).then(response =>{
        dispatch({type: CONTEST_EDIT_TYPES.SET_STATE_TO_EDIT, payload: response})
    }).catch(err=>{
        dispatch({type: CONTEST_EDIT_TYPES.SET_STATE_TO_EDIT, payload: data})
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_FAIL})
    })
}
export const EditState = (dispatch, information) =>{
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
                        var currentDate = new Date()
                        if(dateStart >= dateEnd || dateEnd < currentDate){
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
export const Edit = (dispatch, id)=>{
    axios.put(`/api/contests/update/${id}`).then(response =>{
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_SUCCESS})
    }).catch(err =>{
        dispatch({type: CONTEST_EDIT_TYPES.EDIT_FAIL})
    })
}