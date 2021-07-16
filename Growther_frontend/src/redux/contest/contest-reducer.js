import { ContestTypes } from "./contest-types";

const INITIAL_STATE={
    contestTitle: null,
    contestDescription: null,
    contestWinnersNum: 1,
    contestStart: null,
    contestEnd: null,
    contestRunFor: null,
    contestReach: null,
    prizes: {}
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
                }
            }
        default:
            return state;
    }



}

export default contestReducer;