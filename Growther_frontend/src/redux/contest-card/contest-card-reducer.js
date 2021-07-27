import { Contest_Card_Types } from "./contest-card-types";
const INITIAL_STATE = {
    information: {},
    actions: [],
    selected: [],
    done: []
}
const ContestCard = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case Contest_Card_Types.SET_CONTEST_STATE:
            return{
                ...action.payload,
                selected: Array.isArray(action.payload.actions) ? action.payload.actions.map(item =>{
                    return {provider: item.provider, index: 0}
                }) : []
            }
        case Contest_Card_Types.SELECTED_ACTION:
            return {
                ...state,
                selected: state.selected.map((item, index) =>{
                    if(item.provider === action.payload.provider){
                        return{
                            ...item,
                            index: action.payload.index
                        }
                    }
                    return {... item}
                })
            }
        case Contest_Card_Types.ACTION_DONE:
            return state
        default:
            return state
    }
}
export default ContestCard;