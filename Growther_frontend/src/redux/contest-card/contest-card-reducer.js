import { Contest_Card_Types } from "./contest-card-types";
const INITIAL_STATE = {
    id: "",
    points: 0,
    information: {},
    action: {},
    actionModal: false,
    isLoading: true,
    canParticipate: false,
    error: false
}
const ContestCard = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case Contest_Card_Types.SET_CONTEST_STATE:
            return{
                ...state,
                information: {...action.payload.data},
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
                    actions:  Array.isArray(state.information.actions) ? state.information.actions.map((item, index)=>{
                        if(item !== null && typeof(item) === "object"){
                            if(action.payload.index === index || (typeof(action.payload.id) === "number" && typeof(item.id) === "number" && item.id === action.payload.id)){
                                return {
                                    ...item,
                                    isDone: true,
                                    done: true
                                }
                            }
                            return {
                                ...item,
                            }
                        }
                        return item
                    }) : [],
                },
                action: {},
                points: state.points + action.payload.points,
                isLoading: false,
                actionModal: false
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
        default:
            return state
    }
}
export default ContestCard;