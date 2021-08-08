import { ERRORS_TYPES } from "./errors-types"

const INITIAL_STATE = {
    isError: false,
    errorMessage: ""
}
const ErrorsReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case ERRORS_TYPES.SHOW_ERROR_MODAL:
            return{
                isError: true,
                errorMessage: action.payload
            }
        case ERRORS_TYPES.HIDE_ERROR_MODAL:
            return{
                ...INITIAL_STATE
            }
        default:
            return {
                ...state
            }
    }
}
export default ErrorsReducer;