import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import contestReducer from './contest/contest-reducer'
import userReducer from './user/user.reducer'
import { registrationReducer } from './registration/registration.reducers'
import { loginReducer } from './login/login.reducers'

const persistConfig={
    key:'root',
    storage,
}

const rootReducer=combineReducers({
    user:userReducer,
    contest: contestReducer,
    login:loginReducer,
    registration:registrationReducer
})


export default persistReducer(persistConfig,rootReducer)