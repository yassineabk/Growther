import {authTypes} from './auth.types'
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { currentUser: user } : {currentUser : null};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case authTypes.REGISTER_REQUEST:
      return {   currentUser: action.user
      };
    case authTypes.REGISTER_SUCCESS:
      return {
        currentUser: action.user
      };
    case authTypes.REGISTER_FAILURE:
      return {};
    case authTypes.LOGIN_REQUEST:
      return {
        currentUser: action.user
      };
    case authTypes.LOGIN_SUCCESS:
      return {
        currentUser: action.user
      };
    case authTypes.LOGIN_FAILURE:
      return {};
    case authTypes.LOGOUT:
      return {};
    default:
      return state
  }
}