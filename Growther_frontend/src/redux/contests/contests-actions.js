import axios from "axios"
import { CONTESTS_TYPES } from "./contests-types"

export const GetContests = async (dispatch)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {"Authorization" : `Bearer ${token}`} 
    }
    dispatch({type: CONTESTS_TYPES.GET_CONTESTS_LOADING})
    return axios.get("http://localhost:5000/api/contests/GetContests", config)
        .then(response =>{
            dispatch({type: CONTESTS_TYPES.GET_CONTESTS, payload: response.data})
        }).catch(err =>{
            dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
            return false
        })
}
export const AppendDraft = (dispatch, data) =>{
    dispatch({type: CONTESTS_TYPES.APPEND_TO_DRAFT, payload: data})
}
export const AppendContest = (dispatch, data)=>{
    dispatch({type: CONTESTS_TYPES.APPEND_NEW_CONTEST, payload: data})
}