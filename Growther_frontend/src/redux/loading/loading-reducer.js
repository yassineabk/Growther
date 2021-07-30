import { LOADING_TYPES } from "./loading-types";

const INITIAL_STATE = {
    isLoading: false
}
const LoadingReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case LOADING_TYPES.IS_LOADING:
            return{
                ...state,
                isLoading: true
            }
        case LOADING_TYPES.STOP_LOADING:
            return{
                ...state, 
                isLoading: false
            }
        default:
            return state
    }
}
export default LoadingReducer;