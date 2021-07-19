import { ContestTypes } from "./contest-types";

const INITIAL_STATE={
    contestTitle: null,
    contestDescription: null,
    contestWinnersNum: 1,
    contestStart: null,
    contestEnd: null,
    contestRunFor: null,
    contestReach: null,
    prizes: {},
    actions: [],
}

const contestReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case ContestTypes.SET_NUM_WINNERS:
            return{
                ...state,
                contestWinnersNum: action.payload
            }
        case ContestTypes.SET_PRIZES:
            return{
                ...state,
                prizes: {
                    ...state.prizes,
                    [action.payload.key]: action.payload.value
                }
            }
        case ContestTypes.SET_STATE:
            return {
                ...action.payload,
                prizes: {
                    ...state.prizes
                },
                actions:[
                    ...state.actions
                ]
            }
        case ContestTypes.ADD_ACTION:
            if(state.actions === undefined) return{
                ...state,
                actions: [action.payload]
            }

            var filtred = state.actions.filter(
                item => item.name === action.payload.name
            )

            return {
                ...state,
                actions: filtred.length === 0 ?
                    [...state.actions, action.payload] : [...state.actions]
            }
        case ContestTypes.REMOVE_ACTION:  
            return {
                ...state,
                actions: state.actions.filter(item => item.name !== action.payload)
            }
        case ContestTypes.UPDATE_ACTION:
            return {
                ...state,
                actions: state.actions.map((item, index)=>{
                    if(item.name === action.payload.actionName){
                        return {
                            ...item,
                            [action.payload.key]: action.payload.value
                        }
                    }
                    return {
                        ...item
                    }
                })
            }
        default:
            return state;
    }



}

export default contestReducer;