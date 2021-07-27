import {combineReducers} from 'redux'
import contestReducer from './contest/contest-reducer'
import {registrationReducer } from './registration/registration.reducers'
import {loginReducer} from './login/login.reducer'


const rootReducer=combineReducers({
    contest: contestReducer,
    registration:registrationReducer,
    login:loginReducer
})


export default rootReducer