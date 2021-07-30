import { Contest_Card_Types } from "./contest-card-types";
const INITIAL_STATE = {
    id: "",
    information: {},
    error: false
}
const ContestCard = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case Contest_Card_Types.SET_CONTEST_STATE:
            return{
                ...state,
                information: {...action.payload},
                error: false
            }
        case Contest_Card_Types.CONTEST_CARD_ERROR:
            return{
                ...state,
                error: true
            }
        default:
            return state
    }
}
export default ContestCard;