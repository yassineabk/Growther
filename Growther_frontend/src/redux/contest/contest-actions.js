import { ContestTypes } from "./contest-types";

export const StateChange = (dispatch, data)=>{
    dispatch({type: ContestTypes.SET_STATE, payload: data})
}
export const PrizesChange = (dispatch, key, value)=>{
    dispatch({type: ContestTypes.SET_PRIZES, payload: {key, value}})
}
export const WinnersNumChange = (dispatch, key, value)=>{
    dispatch({type: ContestTypes.SET_WINNERS_NUM, payload: {key, value}})
}
export const RemovePrize = (dispatch, key, value)=>{
    dispatch({type: ContestTypes.REMOVE_PRIZE, payload: {key, value}})
}
export const AddAction = (dispatch, action)=>{
    dispatch({type: ContestTypes.ADD_ACTION, payload: action})
}
export const RemoveAction = (dispatch, actionName)=>{
    dispatch({type: ContestTypes.REMOVE_ACTION, payload: actionName})
}
export const UpdateAction = (dispatch, provider, key, value)=>{
    dispatch({type: ContestTypes.UPDATE_ACTION, payload: {provider, key, value}})
}
export const SetDuration = (dispatch, type, value)=>{
    dispatch({type: ContestTypes.SET_DURATION, payload: {value, type}})
}
export const NextStep = (dispatch)=>{
    dispatch({type: ContestTypes.CHECK_DATA})
}