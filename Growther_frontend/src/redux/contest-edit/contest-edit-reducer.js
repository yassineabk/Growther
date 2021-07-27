import { CONTEST_EDIT_TYPES } from "./contest-edit-types"
const INITIAL_STATE={
    information:{
        title: "",
        description: "",
        endDate: "",
        duration: {},
        maxParticipants: 0,
    },
    actions: [],
    selected: [],
    validData: {},
    isValidData: false,
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
                }
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
                }
            }
        case CONTEST_EDIT_TYPES.EDIT_PREVIEW_SELECTED_ACTION:
            return{
                ...state,
                selected: state.selected.map(item =>{
                    if(item.provider === action.payload.provider){
                        return {
                            ...item,
                            index: action.payload.index
                        }
                    }
                    return {
                        ...item
                    }
                })
            }
        case CONTEST_EDIT_TYPES.CHECK_EDITS:
            return{
                ...state,
                validDate: action.payload.validData,
                isValidData: action.payload.isValidData
            }
        default:
            return state
    }
}
export default EditReducer;