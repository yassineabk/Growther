import {loginTypes} from './login.types'
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { currentUser: user } : {currentUser : null};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case loginTypes.LOGIN_REQUEST:
      return {
        currentUser: action.user
      };
    case loginTypes.LOGIN_SUCCESS:
      return {
        currentUser: action.user
      };
    case loginTypes.LOGIN_FAILURE:
      return {};
    case loginTypes.LOGOUT:
      return {};
    default:
      return state
  }
}