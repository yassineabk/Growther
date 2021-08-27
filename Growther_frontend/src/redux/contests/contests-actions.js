import axios from "axios"
import { BACKEND_API } from "../../services/links"
import { FailAlert, SuccessAlert } from "../alert/alert-actions"
import { CONTESTS_TYPES } from "./contests-types"

export const GetContests = async (dispatch)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
                } 
    }
    dispatch({type: CONTESTS_TYPES.GET_CONTESTS_LOADING})
    return axios.get(`${BACKEND_API}/api/contests/all`, config)
        .then(response =>{
            var {data} = response
            if(Array.isArray(data)){
                var payload = data.map(item =>{
                    if(item && typeof(item) === "object" && item.contest !== null && typeof(item.contest) === "object"){
                        var {contest, user, participationActions, partipationDate, id, totalPoints, done} = item
                        var {startDate, endDate} = contest
                        startDate = startDate.trim().replace(" ", "T")
                        endDate = endDate.trim().replace(" ", "T")
                        contest = {
                            ...contest,
                            startDate,
                            endDate
                        }
                        return {...contest, actions: participationActions, user, partipationDate, participationId: id, totalPoints, done}
                    }
                    return item
                })
                dispatch({type: CONTESTS_TYPES.GET_CONTESTS, payload: payload})
                return true
            }
            dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
            return false
        }).catch(err =>{
            dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
            return false
        }).then(value =>{
            if(value){
                SuccessAlert(dispatch, "Get Contests Successfuly")
            }else{
                FailAlert(dispatch, "Get Contests Failure")
            }
            return value
        })
}
export const AppendDraft = (dispatch, data, idContest, userId) =>{
    try{
        if(typeof(data) === "object"){
            dispatch({type: CONTESTS_TYPES.APPEND_TO_DRAFT, payload: {data, idContest, userId}})
        }else{
            dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
        }
    }catch{
        dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
    }
}
export const AppendContest = (dispatch, data)=>{
    try{
        dispatch({type: CONTESTS_TYPES.APPEND_NEW_CONTEST, payload: data})
    }catch{
        dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
    }
}
export const AppendEditedContest = (dispatch, id, data)=>{
    try{
        dispatch({type: CONTESTS_TYPES.APPEND_EDITED_CONTEST, payload: {id, data}})
    }catch{
        dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
    }
}
export const AppendEditedDraft = (dispatch, id, data)=>{
    try{
        dispatch({type: CONTESTS_TYPES.APPEND_EDITED_DRAFT, payload: {id, data}})
    }catch{
        dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
    }
}
export const DeleteDraft = (dispatch, id) =>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        } 
    }
    dispatch({type: CONTESTS_TYPES.GET_CONTESTS_LOADING})
    axios.delete(`${BACKEND_API}/api/contests/delete/${id}`, config)
        .then(response =>{
            dispatch({type: CONTESTS_TYPES.DELETE_FROM_DRAFT, payload: id})
            return true
        }).catch(err=>{
            //ShowErrorModal(dispatch, "Couldn't delete this contest please try again laters")
            dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
            return false
        }).then(value =>{
            if(value){
                SuccessAlert(dispatch, "Deleted Successfuly")
            }else{
                FailAlert(dispatch, "Deletion Failure")
            }
            return value
        })
}