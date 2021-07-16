import { ContestTypes } from "./contest-types";

export const StateChange = (dispatch, data)=>{
    dispatch({type: ContestTypes.SET_STATE, payload: data})
}
export const PrizesChange = (dispatch, key, value)=>{
    dispatch({type: ContestTypes.SET_PRIZES, payload: {key, value}})
}
export const AddAction = (dispatch, action)=>{
    dispatch({type: ContestTypes.ADD_ACTION, payload: action})
}
export const RemoveAction = (dispatch, actionName)=>{
    dispatch({type: ContestTypes.REMOVE_ACTION, payload: actionName})
}
export const UpdateAction = (dispatch, actionName, key, value)=>{
    dispatch({type: ContestTypes.UPDATE_ACTION, payload: {actionName, key, value}})
}