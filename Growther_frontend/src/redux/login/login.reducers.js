import {loginTypes} from './login.types'
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case loginTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case loginTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case loginTypes.LOGIN_FAILURE:
      return {};
    case loginTypes.LOGOUT:
      return {};
    default:
      return state
  }
}