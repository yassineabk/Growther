import { RESET_ALL_TYPE } from "../reset-all/reset-all-type"
import { WINNERS_TYPES } from "./winners-types"

const INITIAL_STATE = {
    winners: [],
    idContest: null,
    isLoading: false,
    error: false
}
export const WinnersReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case WINNERS_TYPES.GET_CONTEST_WINNERS:
            return {
                ...state,
                winners: action.payload.winners,
                idContest: action.payload.idContest,
                isLoading: false,
                error: false
            }
        case WINNERS_TYPES.GET_CONTEST_WINNERS_LOADING: 
            return {
                ...state,
                isLoading: true,
                error: false
            }
        case WINNERS_TYPES.RESET_CONTEST_WINNERS:
            return {
                ...INITIAL_STATE,
            }
        case WINNERS_TYPES.GET_CONTEST_WINNERS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: true
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