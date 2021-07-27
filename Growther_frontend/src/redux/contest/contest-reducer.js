import { ContestTypes } from "./contest-types";

const INITIAL_STATE={
    information:{
        title: "",
        description: "",
        winnersNbr: 1,
        startDate: "",
        endDate: "",
        duration: {
            type: "days",
            value: 1
        },
        maxParticipants: 0,
        prizes: {
            prize0: ""
        },
    },
    actions: [],
    validData: {},
    isValidData: false,
    validActions: [],
    isValidActions: false,
    isPublished: false,
    activePage: "/dashboard/My Contests/new/firstStep",
    previewActions: [],
    contestLink: "",
    error: null
}
const contestReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case ContestTypes.SET_INITIAL_STATE:{
            return INITIAL_STATE
        }
        case ContestTypes.SET_NEW_CONTEST_STATE:
            return {
                ...state,
                information:{
                    ...action.payload,
                },
                actions:[
                    ...state.actions
                ]
            }
        case ContestTypes.SET_WINNERS_NUM:
            return{
                ...state,
                information:{
                    ...state.information,
                    winnersNbr: action.payload.value,
                    prizes: {
                        ...state.information.prizes,
                        [action.payload.key]: ""
                    }
                }
            }
        case ContestTypes.SET_PRIZES:
            return{
                ...state,
                information:{
                    ...state.information,
                    prizes: {
                        ...state.information.prizes,
                        [action.payload.key]: action.payload.value
                    }
                }
            }
        case ContestTypes.REMOVE_PRIZE:
            return{
                ...state,
                information: {
                    ...state.information,
                    winnersNbr: action.payload.value,
                    prizes: Object.keys(state.information.prizes).reduce((object, key)=>{
                        if(key !== action.payload.key){
                            object[key] = state.information.prizes[key]
                        }
                        return object
                    }, {})
                }
            }
        case ContestTypes.SET_DURATION:
            return {
                ...state,
                information:{
                    ...state.information,
                    duration: {
                        value: action.payload.value,
                        type: action.payload.type
                    },
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate
                }
            }
        case ContestTypes.ADD_ACTION:
            if(state.actions === undefined) return{
                ...state,
                actions: [action.payload],
                previewActions: [{provider: action.payload.provider, index: 0}]
            }

            var filtred = state.actions.filter(
                item => item.provider === action.payload.provider
            )

            return {
                ...state,
                actions: filtred.length === 0 ?
                    [...state.actions, action.payload] : [...state.actions],
                previewActions: filtred.length === 0 ?
                    [...state.previewActions, {provider: action.payload.provider, index: 0}] : [...state.previewActions]
                
            }
        case ContestTypes.REMOVE_ACTION:  
            return {
                ...state,
                actions: state.actions.filter(item => item.provider !== action.payload),
                previewActions: state.previewActions.filter(item => item.provider !== action.payload),
            }
        case ContestTypes.UPDATE_ACTION:
            return {
                ...state,
                actions: state.actions.map((item, index)=>{
                    if(item.provider === action.payload.provider){
                        if(action.payload.key === "action"){
                            return {
                                ...item,
                                active: action.payload.value
                            }
                        }else{
                            return {
                                ...item,
                                actions: {
                                    ...item.actions,
                                    [item.active]: {
                                        ...item.actions[item.active],
                                        [action.payload.key]: action.payload.value
                                    }
                                }
                            }
                        }
                        
                    }
                    return {
                        ...item
                    }
                })
            }
        case ContestTypes.CHECK_DATA:
            return{
                ...state,
                validData: action.payload.validData,
                isValidData: action.payload.isValidData,
            }
        case ContestTypes.CHECK_ACTIONS:
            return {
                ...state,
                validActions: action.payload.validActions,
                isValidActions: action.payload.isValidActions,
            }
        case ContestTypes.RESET_VALIDATION:
            return {
                ...state,
                validData: {},
                isValidData: false
            }
        case ContestTypes.PREVIEW_SELECTED_ACTIONS:
            return{
                ...state,
                previewActions: state.previewActions.map(item => {
                    if(item.provider === action.payload.provider){
                        return{
                            ...item,
                            index: action.payload.index
                        }
                    }
                    return{
                        ...item
                    }
                })
            }
        case ContestTypes.SAVE_DRAFT:
            return{
                ...state
            }
        case ContestTypes.PUBLISH_SUCCESS:
            return{
                ...state,
                isPublished: true,
                contestLink: action.payload.link
            }
        case ContestTypes.PUBLISH_FAIL:
            return{
                ...state,
                isPublished: false,
                error: {isError: true, message: "FAILED TO PUBLISH CONTEST"}
            }
        default:
            return state;
    }
}
export default contestReducer;