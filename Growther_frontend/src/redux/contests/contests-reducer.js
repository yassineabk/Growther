import { CONTESTS_TYPES } from "./contests-types"

const INITIAL_STATE = {
    contests: [],
    error: null,
}
const ContestsReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case CONTESTS_TYPES.GET_CONTESTS_INITIAL_STATE:
            return INITIAL_STATE
        case CONTESTS_TYPES.GET_CONTESTS:
            return {
                ...state,
                contests: action.payload.reverse(),
                error: null
            }
        case CONTESTS_TYPES.GET_CONTESTS_FAIL:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}
export default ContestsReducer