import { PARTICIPATION_TYPES } from "./participation-types"

const INITIAL_STATE = {
    actions: [],
    action: {},
    userId: "", 
    points: 0,
    loggedIn: true,
    error: false,
    isLoading: false,
}
const ParticipationReducer = (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case PARTICIPATION_TYPES.PARTICIPATE:
            return {
                ...INITIAL_STATE,
                userId: action.payload
            }
        case PARTICIPATION_TYPES.DO_ACTION:
            return {
                ...state,
                action: action.payload.action
            }
        case PARTICIPATION_TYPES.ACTION_DONE:
            var points = state.points + action.payload.points
            return {
                ...state,
                actions: [...state.actions, action.payload],
                points: action.payload.points
            }
        case PARTICIPATION_TYPES.ACTION_FAIL:
            return {
                ...state,
                error: true
            }
        default:
            return {...state}
    }
}
export default ParticipationReducer;