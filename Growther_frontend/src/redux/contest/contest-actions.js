import { ContestTypes } from "./contest-types";

export const StateChange = (dispatch, data)=>{
    dispatch({type: ContestTypes.SET_STATE, payload: data})
}
export const PrizesChange = (dispatch, key, value)=>{
    dispatch({type: ContestTypes.SET_PRIZES, payload: {key, value}})
}