import { decode } from "jsonwebtoken"
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
            var token = decode(localStorage.getItem("accessToken"))
            var sub = typeof(token) === "object" ? token.sub : ""
            return {
                ...state,
                contests: Array.isArray(action.payload) ? action.payload.filter(item =>{
                    if(typeof(item.user) === "object"){
                        if(item.user.id.toString() === sub.toString()){
                            return true
                        }
                    }
                    return false
                }).reverse() : [],
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