import { Contest_Card_Types } from "./contest-card-types";
const INITIAL_STATE = {
    id: "",
    points: 0,
    information: {},
    action: {},
    actionModal: false,
    isLoading: true,
    error: false
}
const ContestCard = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case Contest_Card_Types.SET_CONTEST_STATE:
            return{
                ...state,
                information: {...action.payload},
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
                action: action.payload
            }
        case Contest_Card_Types.CLOSE_MODAL:
            return {
                ...state,
                actionModal: false,
                action: {}
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
                                    isDone: true
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