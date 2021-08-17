import { TimeZone } from "../../services/timeLeft"
import { CONTEST_EDIT_TYPES } from "./contest-edit-types"
const INITIAL_STATE={
    information:{
        idContest: "",
        title: "",
        description: "",
        endDate: "",
        duration: {},
        maxReach: 0,
        actions: [],
        prizes: [],
        user: {}
    },
    validData: {},
    isValidData: false,
    edited: false,
    isLoading: false,
    error: false
}
const EditReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case CONTEST_EDIT_TYPES.INIT_EDIT_STATE:
            return INITIAL_STATE
        case CONTEST_EDIT_TYPES.EDIT_LOADING:
            return {
                ...state,
                isLoading: true,
                edited: false,
                error: false
            }
        case CONTEST_EDIT_TYPES.SET_STATE_TO_EDIT:
            return{
                ...state,
                information: {
                    ...action.payload,
                },
                validData: {},
                isLoading: false,
                edited: false,
                isValidData: false,
                error: false
            }
        case CONTEST_EDIT_TYPES.EDIT_STATE:
            var setEndDate = ()=>{
                if(action.payload.targetId){
                    if(action.payload.targetId === "endDate"){
                        return action.payload.data.endDate+"T"+state.information.endTime+`:00.000${TimeZone(state.information.timeZone)}`
                    }else if(action.payload.targetId === "endTime"){
                        return state.information.endDate.split("T")[0]+"T"+action.payload.data.endTime+`:00.000${TimeZone(state.information.timeZone)}`
                    }
                    return state.information.endDate
                }else{
                    return state.information.endDate
                }
            }
            return{
                ...state,
                information: {
                    ...action.payload.data,
                    endDate: setEndDate()
                },
                isLoading: false,
                edited: false,
                error: false
            }
        case CONTEST_EDIT_TYPES.EDIT_DURATION:
            return{
                ...state,
                information:{
                    ...state.information,
                    duration: {
                        value: action.payload.value,
                        type: action.payload.type
                    },
                    endDate: action.payload.endDate
                },
                isLoading: false,
                edited: false,
                error: false
            }
        case CONTEST_EDIT_TYPES.CHECK_EDITS:
            return{
                ...state,
                validData: action.payload.validData,
                isValidData: action.payload.isValidData,
                edited: false,
                error: false
            }
        case CONTEST_EDIT_TYPES.EDIT_SUCCESS:
            return{
                ...state,
                isLoading: false,
                edited: true,
                error: false
            }
        case CONTEST_EDIT_TYPES.EDIT_FAIL:
            return{
                ...state,
                isLoading: false,
                error: true,
                edited: false
            }
        case CONTEST_EDIT_TYPES:
            return {
                ...state,
                error: true,
            }
        default:
            return state
    }
}
export default EditReducer;