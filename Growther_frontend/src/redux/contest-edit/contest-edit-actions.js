import { CONTEST_EDIT_TYPES } from "./contest-edit-types";
import axios from "axios"
export const SetInitialState = (dispatch)=>{
    dispatch({type: CONTEST_EDIT_TYPES.INIT_EDIT_STATE})
}
export const SetStateToEdit = (dispatch, information)=>{
    dispatch({type: CONTEST_EDIT_TYPES.SET_STATE_TO_EDIT, payload: information})
}
export const EditState = (dispatch, information) =>{
    dispatch({type: CONTEST_EDIT_TYPES.EDIT_STATE, payload: information})
}
export const EditDuration = (dispatch, type, value, startDate, endDate) =>{
    dispatch({type: CONTEST_EDIT_TYPES.EDIT_DURATION, payload: {value, type, startDate, endDate}})
}
export const EditSelectedAction = (dispatch, provider, index)=>{
    dispatch({type: CONTEST_EDIT_TYPES.EDIT_PREVIEW_SELECTED_ACTION, payload: {provider, index}})
}
export const CheckEdits = (dispatch, information) =>{
    var data = information
    var validData = {}
    var isValidData = false
    dispatch({type: CONTEST_EDIT_TYPES.CHECK_EDITS, payload: {validData, isValidData}})
}