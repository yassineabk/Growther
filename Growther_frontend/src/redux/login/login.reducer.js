import {loginType} from './login.types';

const INITIAL_STATE={
    
    email:'',
    password:'',
    remember:false,
    isError:false,
    errorMessage:'',
    
    
}

export const loginReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type) {

        case loginType.SET_INITIAL_STATE:
            return INITIAL_STATE
        
        case loginType.SET_EMAIL:
            return {
                ...state,
                email:action.payload
            }
        case loginType.SET_PASSWORD:
            return {
                ...state,
                password:action.payload
            }
        case loginType.SET_REMEMBER_ME:
            return {
                ...state,
                remember:action.payload
            }
        case loginType.SET_LOGIN_ERROR:
            return {
                    ...state,
                    isError:action.payload
                }
        case loginType.SET_LOGIN_ERROR_MESSAGE:
            return {
                    ...state,
                    errorMessage:action.payload
                        }
       
        

        default:
            return state;



    }



}