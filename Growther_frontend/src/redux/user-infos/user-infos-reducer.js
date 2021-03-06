import { loginType } from '../login/login.types';
import { RESET_ALL_TYPE } from '../reset-all/reset-all-type';
import { UserInfosTypes } from './user-infos-types';
// let user = JSON.parse(localStorage.getItem('accessToken'));
// const currentUser = user ? user  :  null

const INITIAL_STATE={
    currentUser:localStorage.getItem('accessToken'),
    email:'',
    name: '',
    isBrand: '',
    id: '',
    url: '',
    activities: '',
    authProvider: '',
    isLoading: false,
    direction: localStorage.getItem("i18nextLng") === "ar" ? "rtl" : "ltr"
}

export const UserInfosReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case UserInfosTypes.SET_USER_INFOS:
            return {
                ...action.payload,
                isLoading: false,
                direction: state.direction
            }
        case UserInfosTypes.IS_LOADING_USER_INFOS:
            return {
                ...state,
                isLoading: true
            }
        case UserInfosTypes.EDIT_USER_INFOS:
            return {
                ...state,
                [action.payload.key]: action.payload.value,
                isLoading: false
            }
        case UserInfosTypes.SET_USER_INFOS_FAIL:
            return {
                ...INITIAL_STATE,
                isLoading: false,
            }
        case UserInfosTypes.SET_DIRECTION:
            return {
                ...state,
                direction: action.payload
            }
        case loginType.LOGOUT:
        case RESET_ALL_TYPE.RESET_ALL:
            return {
                ...INITIAL_STATE,
                currentUser: false,
                direction: localStorage.getItem("i18nextLng") === "ar" ? "rtl" : "ltr"
            }
        default:
            return {
                ...state
            }
    }
}