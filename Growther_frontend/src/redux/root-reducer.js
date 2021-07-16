import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import contestReducer from './contest/contest-reducer'
import userReducer from './user/user.reducer'


const persistConfig={
    key:'root',
    storage,
}

const rootReducer=combineReducers({
    user:userReducer,
    contest: contestReducer
})


export default persistReducer(persistConfig,rootReducer)