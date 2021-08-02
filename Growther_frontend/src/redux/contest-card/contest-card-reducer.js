import { Contest_Card_Types } from "./contest-card-types";
const INITIAL_STATE = {
    id: "",
    information: {},
    error: false,
    isLoading: true,
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
        case Contest_Card_Types.CONTEST_CARD_ERROR:
            return{
                ...state,
                isLoading: false,
                error: true
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