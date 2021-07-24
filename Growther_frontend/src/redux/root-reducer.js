import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import contestReducer from './contest/contest-reducer'
import { authReducer } from './auth/auth.reducers'

const persistConfig={
    key:'root',
    storage,
}

const rootReducer=combineReducers({
    contest: contestReducer,
    auth:authReducer,
})


export default persistReducer(persistConfig,rootReducer)