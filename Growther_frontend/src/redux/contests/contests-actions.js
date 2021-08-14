import axios from "axios"
import { BACKEND_API } from "../../services/links"
import { ShowErrorModal } from "../errors/errors-actions"
import { CONTESTS_TYPES } from "./contests-types"

export const GetContests = async (dispatch)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {"Authorization" : `Bearer ${token}`} 
    }
    dispatch({type: CONTESTS_TYPES.GET_CONTESTS_LOADING})
    return axios.get(`${BACKEND_API}/api/contests/GetContests`, config)
        .then(response =>{
            dispatch({type: CONTESTS_TYPES.GET_CONTESTS, payload: response.data})
        }).catch(err =>{
            dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
            ShowErrorModal(dispatch, "Something went wrong please try again later")
            return false
        })
}
export const AppendDraft = (dispatch, data, idContest, userId) =>{
    if(typeof(data) === "object"){
        dispatch({type: CONTESTS_TYPES.APPEND_TO_DRAFT, payload: {data, idContest, userId}})
    }else{
        dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
    }
}
export const AppendContest = (dispatch, data)=>{
    dispatch({type: CONTESTS_TYPES.APPEND_NEW_CONTEST, payload: data})
}
export const AppendEditedContest = (dispatch, id, data)=>{
    dispatch({type: CONTESTS_TYPES.APPEND_EDITED_CONTEST, payload: {id, data}})
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
            ShowErrorModal(dispatch, "Couldn't delete this contest please try again laters")
            dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
            return false
        })
}