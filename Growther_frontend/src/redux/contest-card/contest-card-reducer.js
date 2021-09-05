import { ContestTypes } from "../contest/contest-types";
import { RESET_ALL_TYPE } from "../reset-all/reset-all-type";
import { Contest_Card_Types } from "./contest-card-types";
const INITIAL_STATE = {
    id: "",
    information: {
        actions:[],
        prizes: [],
        totalPoints: 0
    },
    points: 0,
    action: {},
    actionModal: false,
    isLoading: false,
    isDoingAction: false,
    canParticipate: false,
    error: false,
    winners: []
}
const ContestCard = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case Contest_Card_Types.LOADING_CONTEST_CARD:
            return {
                ...state,
                isLoading: true
            }
        case Contest_Card_Types.DOING_ACTION:
            return {
                ...state,
                isDoingAction: true
            }
        case Contest_Card_Types.SET_CONTEST_STATE:
            return{
                ...state,
                information: {
                    ...action.payload.data,
                    actions: action.payload.data.actions.sort((item, nextItem) => item.ordre - nextItem.ordre),
                    totalPoints: action.payload.data.totalPoints,
                },
                points: action.payload.data.totalPoints,
                canParticipate: action.payload.canParticipate,
                isLoading: false,
                error: false
            }
        case Contest_Card_Types.PARTICIPATE:
            return {
                ...INITIAL_STATE,
                userId: action.payload,
                actionModal: false,
            }
        case Contest_Card_Types.DO_ACTION:
            return {
                ...state,
                actionModal: true,
                action: {
                    ...action.payload.element,
                    index: action.payload.index
                }
            }
        case Contest_Card_Types.CLOSE_MODAL:
            return {
                ...state,
                actionModal: false,
                action: {}
            }
        case Contest_Card_Types.SET_ACTION_TEXT:
            return {
                ...state,
                action: {
                    ...state.action,
                    [action.payload.type ? action.payload.type : "text"]: action.payload.text ? action.payload.text : ""
                },
                information: {
                    ...state.information,
                    actions: Array.isArray(state.information.actions) ? state.information.actions.map((item, index) =>{
                        if(item !== null && typeof(item) === "object" && ((typeof(action.payload.id) === "number" && typeof(item.id) && item.id === action.payload.id) || index === action.payload.index)){
                            return {
                                ...item,
                                [action.payload.type ? action.payload.type : "text"]: action.payload.text ? action.payload.text : ""
                            }
                        }
                        return item
                    }) : []
                }
            }
        case Contest_Card_Types.ACTION_DONE:
            return {
                ...state,
                information: {
                    ...state.information,
                    participationId: action.payload.participationId && action.payload.participationId !== undefined ? action.payload.participationId : state.participationId,
                    actions: Array.isArray(action.payload.actions) ? [...action.payload.actions] : [...state.information.actions.map((item, index)=>{
                        if(item !== null && typeof(item) === "object"){
                            if(action.payload.index === index || (typeof(action.payload.id) === "number" && typeof(item.id) === "number" && item.id === action.payload.id)){
                                return {
                                    ...item,
                                    isDone: true,
                                    done: true
                                }
                            }
                        }
                        return {
                            ...item
                        }
                    })].sort((item, nextItem)=> item.ordre - nextItem.ordre),
                    totalPoints: typeof(state.information.totalPoints) === "number" ? parseInt(state.information.totalPoints) + parseInt(action.payload.points) : (typeof(action.payload.points) === "number" ? parseInt(action.payload.points) : 0),
                },
                action: {},
                canParticipate: true,
                points: typeof(state.points) === "number" ? parseInt(state.points) + parseInt(action.payload.points) : (typeof(action.payload.points) === "number" ? parseInt(action.payload.points) : 0),
                isDoingAction: false,
                isLoading: false,
                actionModal: false
            }
        case Contest_Card_Types.CONTEST_CARD_WINNERS:
            return {
                ...state,
                winners: action.payload,
                isLoading: false,
                error: false
            }
        case Contest_Card_Types.ACTION_FAIL:
            return {
                ...state,
                error: true,
                isLoading: false,
            }
        case Contest_Card_Types.SET_CONTEST_CARD_DATA_FAIL:
            return{
                ...state,
                error: true,
            }
        case Contest_Card_Types.CONTEST_CARD_ERROR:
            return {
                ...state,
                action: {},
                error: true,
                isLoading: false,
                actionModal: false,
            }
        case Contest_Card_Types.CONTEST_CARD_LOADING:
            return {
                ...state,
                isLoading: true,
                error: false,
            }
        case RESET_ALL_TYPE.RESET_ALL:
            return {
                ...INITIAL_STATE
            }
        default:
            return state
    }
}
export default ContestCard;