import {combineReducers} from 'redux'
import contestReducer from './contest/contest-reducer'
import { authReducer } from './auth/auth.reducers'
import {registrationReducer } from './registration/registration.reducers'
import {loginReducer} from './login/login.reducer'


const rootReducer=combineReducers({
    contest: contestReducer,
    auth:authReducer,
    registration:registrationReducer,
    login:loginReducer
})


export default rootReducer