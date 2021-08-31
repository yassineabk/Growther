import axios from "axios"
import { BACKEND_API } from "../../services/links"
import { FailAlert, SuccessAlert } from "../alert/alert-actions"
import { WINNERS_TYPES } from "./winners-types"

export const DrawWinners = (dispatch, idContest)=>{
    var token = localStorage.getItem("accessToken")
    var config = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
                } 
    }
    dispatch({type: WINNERS_TYPES.GET_CONTEST_WINNERS_LOADING})
    axios.get(`${BACKEND_API}/api/contests/winners/${idContest}`, config)
        .then(response =>{
            dispatch({type: WINNERS_TYPES.GET_CONTEST_WINNERS, payload: {winners: response.data, idContest}})
            SuccessAlert(dispatch, "winners_picked_successfully")
        }).catch(err =>{
            dispatch({type: WINNERS_TYPES.GET_CONTEST_WINNERS_FAIL})
            FailAlert(dispatch, "couldn't_draw_winners")
        })
}
export const ResetWinners = (dispatch)=>{
    dispatch({type: WINNERS_TYPES.RESET_CONTEST_WINNERS})
}