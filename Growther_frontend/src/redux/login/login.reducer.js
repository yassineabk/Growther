import {loginType} from './login.types';
// let user = JSON.parse(localStorage.getItem('accessToken'));
// const currentUser = user ? user  :  null

const INITIAL_STATE={
    currentUser:localStorage.getItem('accessToken'),
    email:'',
    password:'',
    remember:false,
    isError:false,
    errorMessage:'',
    isLoading: false
}

export const loginReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type) {

        case loginType.SET_INITIAL_STATE:
            return INITIAL_STATE
        case loginType.SET_EMAIL:
            return {
                ...state,
                email:action.payload,
                isLoading: false
            }
        case loginType.SET_PASSWORD:
            return {
                ...state,
                password:action.payload,
                isLoading: false
            }
        case loginType.SET_REMEMBER_ME:
            return {
                ...state,
                remember:action.payload,
                isLoading: false
            }
        case loginType.SET_LOGIN_ERROR:
            return {
                    ...state,
                    isError:action.payload,
                    isLoading: false
                }
        case loginType.SET_LOGIN_ERROR_MESSAGE:
            return {
                    ...state,
                    errorMessage:action.payload,
                    isLoading: false
                }
        case loginType.LOGIN_REQUEST:
            return {
                    ...state,
                    isLoading: true
            }
        case loginType.LOGIN_SUCCESS:
            return {
                    ...state,
                    currentUser:localStorage.getItem("accessToken"),
                    isLoading: false,
            }
        case loginType.SET_CURRENT_TOKEN: 
            return {
                ...state,
                currentUser: action.payload,
                isLoading: false
            }
        case loginType.LOGOUT:
            return{
                ...INITIAL_STATE,
                currentUser: false
            }
        

        default:
            return state;



    }



}