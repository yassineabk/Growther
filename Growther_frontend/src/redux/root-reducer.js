import {combineReducers} from 'redux'
import contestReducer from './contest/contest-reducer'
import {registrationReducer } from './registration/registration.reducers'
import {loginReducer} from './login/login.reducer'
import ContestCard from './contest-card/contest-card-reducer'
import EditReducer from './contest-edit/contest-edit-reducer'
import ContestsReducer from './contests/contests-reducer'
import ErrorsReducer from './errors/errors-reducer'
import { UserInfosReducer } from './user-infos/user-infos-reducer'
import { WinnersReducer } from './winners/winners-reducer'
import { AlertReducer } from './alert/alert-reducer'


const rootReducer=combineReducers({
    contest: contestReducer,
    registration:registrationReducer,
    login:loginReducer,
    contest_card: ContestCard,
    contest_edit: EditReducer,
    get_contests: ContestsReducer,
    errors: ErrorsReducer,
    userInfos: UserInfosReducer,
    winners: WinnersReducer,
    alerts: AlertReducer
})


export default rootReducer