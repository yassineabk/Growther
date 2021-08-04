import { LOADING_TYPES } from "./loading-types"

export const StartLoading = (dispatch)=>{
    dispatch({type: LOADING_TYPES.IS_LOADING})
}
export const StopLoading = (dispatch)=>{
    dispatch({type: LOADING_TYPES.STOP_LOADING})
}