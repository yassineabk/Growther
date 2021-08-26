import {combineReducers} from 'redux'
import contestReducer from './contest/contest-reducer'
import {registrationReducer } from './registration/registration.reducers'
import {loginReducer} from './login/login.reducer'
import ContestCard from './contest-card/contest-card-reducer'
import EditReducer from './contest-edit/contest-edit-reducer'
import DashboardReducer from './dashboard/dashboard-reducer'
import ContestsReducer from './contests/contests-reducer'
import ErrorsReducer from './errors/errors-reducer'
import { UserInfosReducer } from './user-infos/user-infos-reducer'


const rootReducer=combineReducers({
    contest: contestReducer,
    registration:registrationReducer,
    login:loginReducer,
    contest_card: ContestCard,
    contest_edit: EditReducer,
    dashboard: DashboardReducer,
    get_contests: ContestsReducer,
    errors: ErrorsReducer,
    userInfos: UserInfosReducer,
})


export default rootReducer