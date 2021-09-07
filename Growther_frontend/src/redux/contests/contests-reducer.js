import { RESET_ALL_TYPE } from "../reset-all/reset-all-type"
import { CONTESTS_TYPES } from "./contests-types"

const INITIAL_STATE = {
    contests: [],
    draft: [],
    error: null,
    isLoading: false,
    activeContest: null
}
const ContestsReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case CONTESTS_TYPES.GET_CONTESTS_INITIAL_STATE:
            return INITIAL_STATE
        case CONTESTS_TYPES.APPEND_NEW_CONTEST:
            return {
                ...state,
                contests: [...state.contests.reverse(), action.payload].reverse(),
                error: null,
                isLoading: false
            }
        case CONTESTS_TYPES.APPEND_TO_DRAFT:
            return {
                ...state,
                draft: [...state.draft.reverse(), {
                    ...action.payload.data,
                    status: "DRAFT",
                    idContest: action.payload.idContest,
                    user: {id: action.payload.userId}
                }].reverse(),
                error: null,
                isLoading: false
            }
        case CONTESTS_TYPES.DELETE_FROM_DRAFT:
            return {
                ...state,
                draft: state.draft.filter(item => item.idContest !== action.payload),
                error: null,
                isLoading: false
            }
        case CONTESTS_TYPES.APPEND_EDITED_CONTEST:
            return {
                ...state,
                contests: state.contests.map(item=>{
                    if(item.idContest.toString() === action.payload.id.toString()){
                        return {
                            ...action.payload.data,
                            actions: Array.isArray(action.payload.data.actions) ? [...action.payload.data.actions].sort((item, item2) => item.ordre - item2.ordre) : [...item.actions],
                            prizes: Array.isArray(action.payload.data.actions) ? [...action.payload.data.prizes] : [...item.prizes]
                        }
                    }
                    return item
                })
            }
        case CONTESTS_TYPES.APPEND_DONE_ACTION:
            return {
                ...state,
                contests: Array.isArray(state.contests) && state.contests.length > 0 ? state.contests.map(item=>{
                    if(item.idContest.toString() === action.payload.id.toString()){
                        return {
                            ...item,
                            actions: Array.isArray(state.contests.actions) && state.contests.actions.length > 0 ? state.contests.actions.map(Action =>{
                                if(Action.id === action.payload.actionId){
                                    return {...action.payload.action}
                                }
                                return {
                                    ...item
                                }
                            }) : [],
                            totalPoints: item.totalPoints + action.payload.action.points
                        }
                    }
                    return item
                }) : []
            }
        case CONTESTS_TYPES.APPEND_EDITED_DRAFT:
            return {
                ...state,
                draft: [...state.draft.map(item=>{
                    if(item.idContest.toString() === action.payload.id.toString()){
                        return {
                            ...action.payload.data,
                        }
                    }
                    return item
                })]
            }
        case CONTESTS_TYPES.GET_CONTESTS:
            return {
                ...state,
                contests: Array.isArray(action.payload) ? action.payload.filter(item =>{
                    if(typeof(item.user) === "object" && item.status !== "DRAFT"){
                        return true
                    }
                    return false
                }).reverse() : [],
                draft: Array.isArray(action.payload) ? action.payload.filter(item => {
                    if(typeof(item.user) === "object" && item.status === "DRAFT"){
                        return true
                    }
                    return false
                }) : [],
                isLoading: false,
                error: null
            }
        case CONTESTS_TYPES.GET_CONTESTS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: true
            }
        case CONTESTS_TYPES.GET_CONTESTS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case CONTESTS_TYPES.ACTIVE_CONTEST_ACTION:
            return {
                ...state,
                activeContest: action.payload
            }
        case RESET_ALL_TYPE.RESET_ALL:
            return {
                ...INITIAL_STATE,
            }
        default:
            return state
    }
}
export default ContestsReducer