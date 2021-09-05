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
                    if(item && typeof(item) === "object"){
                        var contest = item.contest !== null && typeof(item.contest) === "object" ? item.contest : item.contestDto
                        var {user, participationActions, partipationDate, id, totalPoints, done} = item
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
            if(err.response.status !== 404){
                dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
                return false
            }
            dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
        }).then(value =>{
            if(value){
                SuccessAlert(dispatch, "get_contests_successfuly")
            }else if(value !== undefined){
                FailAlert(dispatch, "get_contests_failure")
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
        FailAlert(dispatch, "something_went_wrong")
        dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
    }
}
export const AppendContest = (dispatch, data)=>{
    try{
        dispatch({type: CONTESTS_TYPES.APPEND_NEW_CONTEST, payload: data})
    }catch{
        FailAlert(dispatch, "something_went_wrong")
        dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
    }
}
export const AppendEditedContest = (dispatch, id, data)=>{
    try{
        dispatch({type: CONTESTS_TYPES.APPEND_EDITED_CONTEST, payload: {id, data}})
    }catch{
        FailAlert(dispatch, "something_went_wrong")
        dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
    }
}
export const AppendEditedDraft = (dispatch, id, data)=>{
    try{
        dispatch({type: CONTESTS_TYPES.APPEND_EDITED_DRAFT, payload: {id, data}})
    }catch{
        FailAlert(dispatch, "something_went_wrong")
        dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
    }
}
export const AppendActionDone = (dispatch, contestId, actionId, action)=>{
    try{
        dispatch({type: CONTESTS_TYPES.APPEND_DONE_ACTION, payload: {id: contestId, actionId, action}})
    }catch{
        FailAlert(dispatch, "something_went_wrong")
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
                SuccessAlert(dispatch, "deleted_successfuly")
            }else{
                FailAlert(dispatch, "deletion_failure")
            }
            return value
        })
}
export const ActiveContest = (dispatch, contest, timeout, clear)=>{
    var payload = contest
    if(clear){
        clearInterval(timeout)
        payload = {}
    }
    dispatch({type: CONTESTS_TYPES.ACTIVE_CONTEST_ACTION, payload: payload})
}