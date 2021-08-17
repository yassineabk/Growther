import { TimeZone } from "../../services/timeLeft";
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
        immediately: false
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
                    startDate: action.payload.startDate && action.payload.startTime ? action.payload.startDate+"T"+action.payload.startTime+`:00.000${TimeZone(action.payload.timeZone)}` : "",
                    endDate: action.payload.endDate && action.payload.endTime ? action.payload.endDate+"T"+action.payload.endTime+`:00.000${TimeZone(action.payload.timeZone)}` : "",
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
            fullDate = fullDate+"T"+startTime+`:00.000${TimeZone(state.information.timeZone)}`
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
            var setStartDate =  ()=>{
                if(action.payload.targetId){
                    if(action.payload.targetId === "startDate"){
                        return action.payload.data.startDate+"T"+state.information.startTime+`:00.000${TimeZone(state.information.timeZone)}`
                    }else if(action.payload.targetId === "startTime"){
                        return state.information.startDate.split("T")[0]+"T"+action.payload.data.startTime+`:00.000${TimeZone(state.information.timeZone)}`
                    }
                    return state.information.startDate
                }else{
                    return state.information.startDate
                }
            }
            var setEndDate = ()=>{
                if(action.payload.targetId){
                    if(action.payload.targetId === "endDate"){
                        return action.payload.data.endDate+"T"+state.information.endTime+`:00.000${TimeZone(state.information.timeZone)}`
                    }else if(action.payload.targetId === "endTime"){
                        return state.information.endDate.split("T")[0]+"T"+action.payload.data.endTime+`:00.000${TimeZone(state.information.timeZone)}`
                    }
                    return state.information.endDate
                }else{
                    return state.information.endDate
                }
            }
            return {
                ...state,
                information:{
                    ...action.payload.data,
                    startDate: setStartDate(),
                    endDate: setEndDate()
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
        case ContestTypes.RESET_NEW_CONTEST:
            return {
                ...INITIAL_STATE,
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