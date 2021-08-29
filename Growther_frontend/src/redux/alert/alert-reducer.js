import { RESET_ALL_TYPE } from "../reset-all/reset-all-type"
import { ALERT_TYPES } from "./alert-types"

const INITIAL_STATE = {
    alerts: [],
}
export const AlertReducer = (state= INITIAL_STATE, action)=>{
    switch(action.type){
        case ALERT_TYPES.SUCCESS_ALERT:
            return{
                ...state,
                alerts: [
                    ...state.alerts.reverse().map((item, index)=>{
                        return {
                            ...item,
                            show: index <= 1 && item.show,
                        }
                    }).reverse(),
                    {show: true, isSuccess: true, message: action.payload.message, timeout: action.payload.timeout}
                ]
            }
        case ALERT_TYPES.FAIL_ALERT:
            return{
                ...state,
                alerts: [
                    ...state.alerts.reverse().map((item, index)=>{
                        return {
                            ...item,
                            show: index <= 1 && item.show,
                        }
                    }).reverse(),
                    {show: true, isFail: true, message: action.payload.message, timeout: action.payload.timeout}
                ]
            }
        case ALERT_TYPES.HIDE_ALERT:
            return{
                ...state,
                alerts: [
                    ...state.alerts.reverse().map((item, index) => {
                        if(item.timeout === action.payload){
                            clearTimeout(item.timeout)
                            return {
                                ...item,
                                show: false
                            }
                        }
                        return {
                            ...item,
                            show: index <= 1 && item.show
                        }
                    }).reverse()
                ]
            }
        case RESET_ALL_TYPE.RESET_ALL:
            return {
                ...INITIAL_STATE
            }
        default:
            return {
                ...state
            }
    }
}