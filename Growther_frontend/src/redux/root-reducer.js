import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import contestReducer from './contest/contest-reducer'
import { authReducer } from './auth/auth.reducers'
import ContestCard from './contest-card/contest-card-reducer'
import EditReducer from './contest-edit/contest-edit-reducer'

const persistConfig={
    key:'root',
    storage,
}

const rootReducer=combineReducers({
    contest: contestReducer,
    auth: authReducer,
    contest_card: ContestCard,
    contest_edit: EditReducer,
})


export default persistReducer(persistConfig,rootReducer)