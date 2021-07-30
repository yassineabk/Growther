import { CONTESTS_TYPES } from "./contests-types"

const INITIAL_STATE = {
    contests: [],
    error: null,
    isLoading: false
}
const ContestsReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case CONTESTS_TYPES.GET_CONTESTS_INITIAL_STATE:
            return INITIAL_STATE
        case CONTESTS_TYPES.GET_CONTESTS:
            return {
                ...state,
                contests: action.payload.reverse(),
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
        default:
            return state
    }
}
export default ContestsReducer