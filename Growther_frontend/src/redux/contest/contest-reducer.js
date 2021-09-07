import { RESET_ALL_TYPE } from "../reset-all/reset-all-type";
import { ContestTypes } from "./contest-types";

const INITIAL_STATE={
    information:{
        title: "",
        description: "",
        winnersNbr: 1,
        actionsNbr: 0,
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        timeZone: "",
        duration: {
            type: "days",
            value: 1
        },
        maxReach: 0,
        prizes: [
            {description: ""}
        ],
        actions: [],
        user: null,
        immediately: false,
        minPoints: 1,
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
                    actions: Array.isArray(state.information.actions) && state.information.actions.length > 1 ? state.information.actions.sort((item, item2)=> item.ordre - item2.ordre) : state.information.actions,
                    startDate: action.payload.startDate && action.payload.startTime ? action.payload.startDate+"T"+action.payload.startTime : "",
                    endDate: action.payload.endDate && action.payload.endTime ? action.payload.endDate+"T"+action.payload.endTime : "",
                    startTime: action.payload.startTime ? action.payload.startTime : "",
                    endTime: action.payload.endTime ? action.payload.endTime : "",
                    timeZone: action.payload.timeZone ? action.payload.timeZone : ""
                }
            }
        }
        case ContestTypes.SET_IMMEDIATELY:
            var currentDate = new Date()
            var fullDate = ""
            var startTime = ("0"+currentDate.getHours()).slice(-2) + ":" + ("0"+currentDate.getMinutes()).slice(-2)
            if(action.payload === true){
                var day = ("0"+ currentDate.getDate()).slice(-2)
                var month = ("0" + parseInt(currentDate.getMonth()+1 === 13 ? 1 : currentDate.getMonth() + 1)).slice(-2)
                var year = currentDate.getFullYear()
                fullDate = year + "-" + month + "-" + day
            }
            var duration = Math.abs(Math.ceil((new Date(fullDate) - new Date(state.information.endDate))/(1000*60*60*24)))
            fullDate = fullDate+"T"+startTime
            return {
                ...state,
                information: {
                    ...state.information,
                    immediately: action.payload,
                    startDate: action.payload === true ? fullDate : state.information.startDate,
                    startTime: startTime,
                    duration: {
                        ...state.information.duration,
                        value: duration,
                        type: "days"
                    }
                }
            }
        case ContestTypes.SET_TIME:
            return {
                ...state,
                information: {
                    ...state.information,
                    endTime: action.payload ? action.payload : state.information.endTime
                },
                isLoading: false,
                error: null
            }
        case ContestTypes.SET_NEW_CONTEST_STATE:
            var setStartDate =  (target, startDate, startTime)=>{
                if(startDate && startTime){
                    if(target === "startDate"){
                        return action.payload.data.startDate+"T"+startTime
                    }else if(target === "startTime"){
                        return startDate.split("T")[0]+"T"+action.payload.data.startTime
                    }
                    return startDate.split("T")[0]+"T"+startTime
                }
                return false
            }
            var setEndDate = (target, endDate, endTime)=>{
                if(endDate && endTime){
                    if(target === "endDate"){
                        return action.payload.data.endDate+"T"+endTime
                    }else if(target === "endTime"){
                        return endDate.split("T")[0]+"T"+action.payload.data.endTime
                    }
                    return endDate.split("T")[0]+"T"+endTime
                }
                return false
            }
            return {
                ...state,
                information:{
                    ...action.payload.data,
                    startDate: setStartDate(action.payload.targetId, state.information.startDate, state.information.startTime) ? setStartDate(action.payload.targetId, state.information.startDate, state.information.startTime) : state.information.startDate,
                    endDate: setEndDate(action.payload.targetId, state.information.endDate, state.information.endTime) ? setEndDate(action.payload.targetId, state.information.endDate, state.information.endTime) : state.information.endDate,
                    actions: [
                        ...action.payload.data.actions
                    ].sort((item, nextItem) => item.ordre - nextItem.ordre)
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
                    winnersNbr: action.payload.value && action.payload.value !== null & typeof(action.payload.value) === "number" ?  action.payload.value : 1,
                    prizes: action.payload.value && action.payload.value !== null & typeof(action.payload.value) === "number" ?
                    [
                        ...state.information.prizes,
                        {
                            description: ""
                        }
                    ] : [
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
                        if(index + 1 > action.payload.value){
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
                    actions: [{...action.payload, ordre: 1}],
                    actionsNbr: 1,
                },
                isLoading: false,
                error: null
            }

            return {
                ...state,
                information:{
                    ...state.information,
                    actions: [...state.information.actions, {...action.payload, ordre: state.information.actions.length + 1}],
                    actionsNbr: state.information.actions.length + 1
                },
                isLoading: false,
                error: null
            }
        case ContestTypes.CHANGE_ACTIONS_ORDER:
            return {
                ...state,
                information: {
                    ...state.information,
                    actions: state.information.actions.map(element =>{
                        if(element.ordre === action.payload.order1){
                            return {
                                ...element,
                                ordre: action.payload.order2
                            }
                        }
                        if(element.ordre === action.payload.order2){
                            return {
                                ...element,
                                ordre: action.payload.order1
                            }
                        }
                        return {
                            ...element
                        }
                    }).sort((item, nextItem) => item.ordre - nextItem.ordre)
                },
                isLoading: false,
                error: null
            }
        case ContestTypes.CHANGE_ACTIONS_PLACE:
            return {
                ...state,
                information: {
                    ...state.information,
                    actions: state.information.actions.map((element, index)=>{
                        if(element.ordre <= action.payload.newIndex && element.ordre > action.payload.dragged){
                            return {
                                ...element,
                                ordre: element.ordre - 1
                            }
                        }
                        if(element.ordre >= action.payload.newIndex && element.ordre < action.payload.dragged){
                            return {
                                ...element,
                                ordre: element.ordre + 1
                            }
                        }
                        if(element.ordre === action.payload.dragged){
                            return {
                                ...element,
                                ordre: action.payload.newIndex
                            }
                        }
                        return {
                            ...element,
                        }
                    }).sort((item, nextItem)=> item.ordre - nextItem.ordre)
                }
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
                    }).map((element, index) =>{
                        return {
                            ...element,
                            ordre: index + 1
                        }
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
        case ContestTypes.RESET_NEW_CONTEST:
            return {
                ...INITIAL_STATE,
                information:{
                    ...INITIAL_STATE.information,
                    startDate: action.payload.startDate && action.payload.startTime ? action.payload.startDate+"T"+action.payload.startTime : "",
                    endDate: action.payload.endDate && action.payload.endTime ? action.payload.endDate+"T"+action.payload.endTime : "",
                    startTime: action.payload.startTime ? action.payload.startTime : "",
                    endTime: action.payload.endTime ? action.payload.endTime : "",
                    timeZone: action.payload.timeZone ? action.payload.timeZone : ""
                }
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
        case ContestTypes.ADD_ACTIONS_PRIZES_IDS_TO_EDITED_DRAFT:
            console.log(action.payload)
            return {
                ...state,
                information: {
                    ...state.information,
                    actions: Array.isArray(action.payload.actions) ? [...action.payload.actions].sort((item, item2) => item.ordre - item2.ordre) : [...state.information.actions],
                    prizes: Array.isArray(action.payload.prizes) ? [...action.payload.prizes]: [...state.information.prizes]
                },
                isLoading: false,
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
        case ContestTypes.SET_NEW_CONTEST_DATA_FAIL:
            return{
                ...state,
                error: true,
                isLoading: false
            }
        case ContestTypes.PUBLISH_SUCCESS:
            return{
                ...state,
                isPublished: true,
                contestLink: typeof(action.payload) === "string" ? action.payload.split(" ").join("%20") : "",
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
        case RESET_ALL_TYPE.RESET_ALL:
            return {
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}
export default contestReducer;