import {combineReducers} from 'redux'
import contestReducer from './contest/contest-reducer'
import {registrationReducer } from './registration/registration.reducers'
import {loginReducer} from './login/login.reducer'
import { authReducer } from './auth/auth.reducers'
import ContestCard from './contest-card/contest-card-reducer'
import EditReducer from './contest-edit/contest-edit-reducer'


const rootReducer=combineReducers({
    contest: contestReducer,
    registration:registrationReducer,
    login:loginReducer,
    contest_card: ContestCard,
    contest_edit: EditReducer,
})


export default rootReducer