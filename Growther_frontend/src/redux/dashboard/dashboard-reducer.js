import { DASHBOARD_TYPES } from "./dahsboard-types"

const INITIAL_STATE = {
    contests: [],
    templates: [],
    error: null
}
const DashboardReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case DASHBOARD_TYPES.DASHBOARD_GET_DATA:
            return{
                ...state,
                contests: action.payload,
                error: false
            }
        case DASHBOARD_TYPES.DASHBOARD_GET_DATA_FAIL:
            return{
                ...state,
                error: true
            }
        default:
            return state
    }
}
export default DashboardReducer