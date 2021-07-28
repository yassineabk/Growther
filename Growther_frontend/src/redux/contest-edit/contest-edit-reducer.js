import { CONTEST_EDIT_TYPES } from "./contest-edit-types"
const INITIAL_STATE={
    information:{
        title: "",
        description: "",
        endDate: "",
        duration: {},
        maxReach: 0,
        actions: [],
        prizes: []
    },
    selected: [],
    validData: {},
    isValidData: false,
    edited: false,
    error: null
}
const EditReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case CONTEST_EDIT_TYPES.INIT_EDIT_STATE:
            return INITIAL_STATE
        case CONTEST_EDIT_TYPES.SET_STATE_TO_EDIT:
            return{
                ...action.payload,
                validData: {},
                isValidData: false,
                selected: Array.isArray(action.payload.actions) ? action.payload.actions.map(item =>{
                    return {provider: item.provider, index: 0}
                }) : [],
                error: null
            }
        case CONTEST_EDIT_TYPES.EDIT_STATE:
            return{
                ...state,
                information: {
                    ...action.payload
                },
                error: false
            }
        case CONTEST_EDIT_TYPES.EDIT_DURATION:
            return{
                ...state,
                information:{
                    ...state.information,
                    duration: {
                        value: action.payload.value,
                        type: action.payload.type
                    },
                    endDate: action.payload.endDate
                },
                error: false
            }
        case CONTEST_EDIT_TYPES.CHECK_EDITS:
            return{
                ...state,
                validDate: action.payload.validData,
                isValidData: action.payload.isValidData,
                error: false
            }
        case CONTEST_EDIT_TYPES.EDIT_SUCCESS:
            return{
                ...state,
                edited: true,
                error: false
            }
        default:
            return state
    }
}
export default EditReducer;