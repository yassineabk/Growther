import axios from "axios"
import { CONTESTS_TYPES } from "./contests-types"

export const GetContests = (dispatch)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {"Authorization" : `Bearer ${token}`} 
    }
    dispatch({type: CONTESTS_TYPES.GET_CONTESTS_LOADING})
    axios.get("https://staging-backendapp.herokuapp.com/api/contests/GetContests", config)
        .then(response =>{
            dispatch({type: CONTESTS_TYPES.GET_CONTESTS, payload: response.data})
        }).catch(err =>{
            dispatch({type: CONTESTS_TYPES.GET_CONTESTS_FAIL})
        })
}