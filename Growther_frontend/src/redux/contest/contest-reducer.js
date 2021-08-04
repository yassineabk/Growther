import { ContestTypes } from "./contest-types";

const INITIAL_STATE={
    information:{
        title: "",
        description: "",
        winnersNbr: 1,
        actionsNbr: 0,
        startDate: "",
        endDate: "",
        duration: {
            type: "days",
            value: 1
        },
        maxReach: 0,
        prizes: [
            {description: ""}
        ],
        actions: [],
        user: null
    },
    validData: {},
    isValidData: false,
    validActions: [],
    isValidActions: false,
    savedInfos: false,
    savedPrizes: false,
    isPublished: false,
    activePage: "/dashboard/My Contests/new/firstStep",
    contestLink: "",
    isLoading: false,
    error: null
}
const contestReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case ContestTypes.SET_INITIAL_STATE:{
            return {
                ...state,
                information:{
                    ...state.information,
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate
                }
            }
        }
        case ContestTypes.SET_NEW_CONTEST_STATE:
            return {
                ...state,
                information:{
                    ...action.payload,
                },
                isLoading: false,
                error: null
            }
        case ContestTypes.SET_NEW_CONTEST_USER:
            return {
                ...state,
                user: action.payload,
                savedInfos: true,
                isLoading: false,
                error: false
            }
        case ContestTypes.SET_WINNERS_NUM:
            return{
                ...state,
                information:{
                    ...state.information,
                    winnersNbr: action.payload.value,
                    prizes: [
                        ...state.information.prizes,
                        {
                            description: ""
                        }
                    ]
                },
                isLoading: false,
                error: null
            }
        case ContestTypes.SET_PRIZES:
            return{
                ...state,
                information:{
                    ...state.information,
                    prizes: state.information.prizes.map((item, index)=> {
                        if(index === action.payload.id){
                            return {...item, description: action.payload.value}
                        }
                        return {...item}
                    })
                },
                isLoading: false,
                error: null
            }
        case ContestTypes.REMOVE_PRIZE:
            return{
                ...state,
                information: {
                    ...state.information,
                    winnersNbr: action.payload.value,
                    prizes: state.information.prizes.filter((item, index)=>{
                        if(index === action.payload.id){
                            return false
                        }
                        return true
                    })
                },
                isLoading: false,
                error: null
            }
        case ContestTypes.SET_DURATION:
            if(action.payload.value < 0){
                return {
                    ...state
                }
            }
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
                },
                isLoading: false,
                error: null
            }
        case ContestTypes.ADD_ACTION:
            if(state.information.actions === undefined) return{
                ...state,
                information:{
                    ...state.information,
                    actions: [action.payload],
                    actionsNbr: 1
                },
                isLoading: false,
                error: null
            }

            return {
                ...state,
                information:{
                    ...state.information,
                    actions: [...state.information.actions, action.payload],
                    actionsNbr: state.information.actions.length + 1
                },
                isLoading: false,
                error: null
            }
        case ContestTypes.REMOVE_ACTION:  
            return {
                ...state,
                information:{
                    ...state.information,
                    actions: state.information.actions.filter((item, index) => {
                        if(item.provider === action.payload.actionName && index === action.payload.index){
                            return false
                        }
                        return true
                    }),
                    actionsNbr: state.information.actionsNbr === 0 ?  0 : state.information.actionsNbr - 1 
                },
                validActions: state.validActions.filter((item, index) => {
                    if(item.provider === action.payload.actionName && index === action.payload.index){
                        return false
                    }
                    return true
                }),
                isLoading: false,
                error: null
            }
        case ContestTypes.UPDATE_ACTION:
            return {
                ...state,
                information: {
                    ...state.information,
                    actions: state.information.actions.map((item, index)=>{
                        if(item.provider === action.payload.provider && index === action.payload.index){
                            if(action.payload.key === "type"){
                                return {
                                    ...item,
                                    type: action.payload.value,
                                }
                            }else if(action.payload.key === "url"){
                                return{
                                    ...item,
                                    [action.payload.key]: action.payload.value
                                }
                            }else if(action.payload.key === "points"){
                                return {
                                    ...item,
                                    [action.payload.key]: action.payload.value > 5 || action.payload.value < 1  ? 1 : action.payload.value
                                }
                            }else{
                                return {...item}
                            }
                            
                        }
                        return {
                            ...item
                        }
                    })
                },
                isLoading: false,
                error: null
            }
        case ContestTypes.CHECK_DATA:
            return{
                ...state,
                validData: action.payload.validData,
                isValidData: action.payload.isValidData,
                isLoading: false,
                error: null
            }
        case ContestTypes.CHECK_ACTIONS:
            return {
                ...state,
                validActions: action.payload.validActions,
                isValidActions: action.payload.isValidActions,
                isLoading: false,
                error: null,
            }
        case ContestTypes.RESET_VALIDATION:
            return {
                ...state,
                validData: {},
                isValidData: false,
                isLoading: false,
                error: null
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
                }),
                error: null
            }
        case ContestTypes.NEW_CONTEST_LOADING:
            return{
                ...state,
                isLoading: true
            }
        case ContestTypes.SAVE_DRAFT:
            return{
                ...state,
                isLoading: false,
                error: false
            }
        case ContestTypes.DUPLICATE_CONTEST:
            return{
                ...state,
                isLoading: false,
                error: false
            }
        case ContestTypes.PUBLISH_SUCCESS:
            return{
                ...state,
                isPublished: true,
                contestLink: action.payload,
                isLoading: false,
                error: false
            }
        case ContestTypes.PUBLISH_FAIL:
            return{
                ...state,
                isPublished: false,
                isLoading: false,
                error: {isError: true, message: "FAILED TO PUBLISH CONTEST"},
            }
        default:
            return state;
    }
}
export default contestReducer;