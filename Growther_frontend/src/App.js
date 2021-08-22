import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import './App.scss';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import SignUpPage from './pages/sign-up/sign-up.page';
import LoginPage from './pages/login/login.page';
import Dashboard from './pages/dashboard/dashborad.page';
import LandingPage from './pages/landing-page/landing-page.page';
import { Contest } from "./pages/contest/contest.page"
import { EditContest } from './Components/contest/edit-contest/edit-contest.component';
import OAuth2RedirectHandler from './services/OAuth2-redirect-handler';
import { NewContest } from './Components/contest/new-contest/new-contest.component';
import { ContestFirstStep } from './Components/contest/contest-first-step/contest-first-step.component';
import { ContestSecondStep } from './Components/contest/contest-second-step/contest-second-step.component';
import { ContestThirdStep } from './Components/contest/contest-third-step/contest-third-step.component';
import { DashboardTemplatesPage } from './Components/dashboard/templates-page/templates-page.component';
import { DashboardContestPage } from './Components/contest/contests-page/contests-page.component';
import { DashboardHomePage } from './Components/dashboard/home-page/home-page.component';
import { Page404 } from './pages/404-page/404.page';
import { EditContestFirstStep } from './Components/contest/edit-contest-first-step/edit-contest-first-step.component';
import { EditContestSecondStep } from './Components/contest/edit-contest-second-step/edit-contest-second-step.component';
import { DraftPage } from './Components/dashboard/draft-page/draft-page.component';
import { ErrorsModal } from './Components/errors-modal/errors-modal.component';
import { ActionModalContainer } from './Components/contest/action-modal-container/action-modal-container.component';
import SpotifyAuthHandler from './services/Spotify-auth-handler';
import DiscordAuthHandler from './services/discord-auth-handler';
import DiscordBotAuthHandler from './services/discord-bot-auth-handler';
import { SettingsComponent } from './pages/settings/settings.page';
import { SupportPage } from './pages/support/support.page';
import { EditContestThirdStep } from './Components/contest/edit-contest-third-step/edit-contest-third-step.component';
import axios from 'axios';
import { decode } from 'jsonwebtoken';
import { SetCurrentToken } from './redux/login/login.actions';
import { setUserInfos, setUserInfosFail } from './redux/user-infos/user-infos-actions';

const App = ()=> {
  var { currentUser } = useSelector(state => state.login)
  var infos, {isBrand} = useSelector(state => state.userInfos)
  var { actionModal, action, information } = useSelector(state => state.contest_card)
  var [token, setToken] = useState(localStorage.getItem("accessToken"))
  var history = useHistory()
  var dispatch = useDispatch()
  window.addEventListener("storage", (event)=>{
    var key = event.key
    if(key !== "accessToken" || key === null || !key) return false
    var oldValue = event.oldValue
    var newToken = event.newValue
    SetCurrentToken(dispatch, newToken)
    setToken(newToken)
    if(newToken === null || !newToken){
      setUserInfosFail(dispatch)
      return history.push("/")
    }
    if(newToken === oldValue){
      return true
    }
    var decodedToken = decode(newToken)
    if(decodedToken !== null && typeof(decodedToken) === "object"){
        var sub = decodedToken.sub
        var config = {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${newToken}`
            } 
        }
        if(!infos || infos === null || typeof(infos) !== "object" || infos.id !== parseInt(sub)){
            axios.get(`https://staging-backendapp.herokuapp.com/api/users/${sub}`, config)
                .then(response =>{
                  setUserInfos(dispatch, response.data)
                }).catch(err => {
                  setUserInfosFail(dispatch)
                })
        }
    }
  })
  useEffect(()=>{
    var decodedToken = decode(token)
    if(decodedToken !== null && typeof(decodedToken) === "object"){
        var sub = decodedToken.sub
        var config = {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            } 
        }
        if(!infos || infos === null || typeof(infos) !== "object" || infos.id !== parseInt(sub)){
            axios.get(`https://staging-backendapp.herokuapp.com/api/users/${sub}`, config)
                .then(response =>{
                  setUserInfos(dispatch, response.data)
                }).catch(err => {
                  setUserInfos(dispatch, {})
                })
        }
    }
  }, [dispatch])
  return (
    <div className={"App"}>
          <Switch>
            <Route path="/discord/bot/redirect" component={DiscordBotAuthHandler}></Route> 
            <Route path="/discord/redirect" component={DiscordAuthHandler}></Route> 
            <Route path="/spotify/redirect" component={SpotifyAuthHandler}></Route> 
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route> 
            <Route exact path={"/"} render={()=> <Redirect to='/landing-page' />}/>
            <Route exact path='/landing-page' render={()=> <LandingPage />} />
            <Route exact path='/login' render={()=> currentUser ? (<Redirect to='/dashboard'/>) : (<LoginPage/>) } />
            <Route exact path='/signup' render={()=> currentUser ? (<Redirect to='/'/>) : (<SignUpPage/>) } />
            <Route exact path='/contest/:title/:id' render={()=> ([
              <ErrorsModal />,
              <ActionModalContainer idContest={information.idContest} show={actionModal} action={action} />,
              <Contest />
            ])}/>
            <Route exact path='/dashboard/pie' render={()=> (currentUser && isBrand === "true") ? (<Dashboard />) : (<Redirect to='/'/>)} />
            <Route exact path='/dashboard/draft' render={()=> (currentUser && isBrand === "true") ?  (<Dashboard child={<DraftPage />} />) : (<Redirect to='/'/>)} />
            <Route exact path='/dashboard/settings' render={()=> currentUser ?  (<Dashboard child={<SettingsComponent infos={infos} />} />) : (<Redirect to='/'/>)} />
            <Route exact path='/dashboard/support' render={()=> currentUser ?  (<Dashboard child={<SupportPage />} />) : (<Redirect to='/'/>)} />
            <Route exact path="/dashboard/My Contests/new" render={()=> (
                <Redirect to="/dashboard/My Contests/new/firstStep" />
            )} />
            <Route exact path="/dashboard/My Contests/new/firstStep" render={()=> (
                (currentUser && isBrand === "true") ? (<Dashboard child={<NewContest child={ <ContestFirstStep />}/>} />) : (<Redirect to="/"/>)
            )} />
            <Route exact path="/dashboard/My Contests/new/secondStep" render={()=> (
                (currentUser && isBrand === "true") ? (<Dashboard child={<NewContest child={ <ContestSecondStep />}/>} />) : (<Redirect to="/"/>)
            )} />
            <Route exact path="/dashboard/My Contests/new/thirdStep" render={()=> (
                (currentUser && isBrand === "true") ? (<Dashboard child={<NewContest child={ <ContestThirdStep />}/>} />) : (<Redirect to="/"/>)
            )} />
            <Route exact path='/dashboard/My Contests' render={()=>
              (currentUser) ? (<Dashboard child={<DashboardContestPage />} />) : (<Redirect to="/" />)
            }/>
            <Route exact path='/dashboard/My Contests/edit/:id' render={()=> (
                (currentUser && isBrand === "true") ? (<Dashboard child={<EditContest child={<EditContestFirstStep />} />} />):(<Redirect to='/'/>)
            )}/>
            <Route exact path='/dashboard/My Contests/result/:id' render={()=> (
                (currentUser && isBrand === "true") ? (<Dashboard child={<EditContest child={<EditContestSecondStep data={[]} />} />} />):(<Redirect to='/'/>)
            )}/>
            <Route exact path='/dashboard/My Contests/winners/:id' render={()=> (
                (currentUser && isBrand === "true") ? (<Dashboard child={<EditContest child={<EditContestThirdStep />} />} />):(<Redirect to='/'/>)
            )}/>
            <Route exact path='/dashboard/Templates' render={()=>(currentUser && isBrand === "true") ? (<Dashboard child={<DashboardTemplatesPage />} />):(<Redirect to='/'/>)}/>
            <Route exact path='/dashboard' render={()=> (currentUser) ? (<Dashboard child={
              <DashboardHomePage />
            }/>):(<Redirect to='/'/>) } />
            <Route render={()=> (<Page404 />)} />
        </Switch>
    </div>
  );
}

export default App;