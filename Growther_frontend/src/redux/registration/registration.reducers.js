import { registrationTypes } from './registration.types'

export function registrationReducer(state = {}, action) {
  switch (action.type) {
    case registrationTypes.REGISTER_REQUEST:
      return { registering: true };
    case registrationTypes.REGISTER_SUCCESS:
      return {};
    case registrationTypes.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}