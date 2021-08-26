import axios from "axios"
import { BACKEND_API } from "../../services/links"
import { WINNERS_TYPES } from "./winners-types"

export const DrawWinners = (dispatch, contestId)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
                } 
    }
    dispatch({type: WINNERS_TYPES.GET_CONTEST_WINNERS_LOADING})
    axios.get(`${BACKEND_API}/api/contests/winners/${contestId}`, config)
        .then(response =>{
            dispatch({type: WINNERS_TYPES.GET_CONTEST_WINNERS, payload: response.data})
        }).catch(err =>{
            dispatch({type: WINNERS_TYPES.GET_CONTEST_WINNERS_FAIL})
        })
}