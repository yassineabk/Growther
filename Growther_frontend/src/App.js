import React from 'react';
import 'bulma/css/bulma.min.css';
import './App.scss';
import {Switch, Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
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

const App = ()=> {
  var { currentUser } = useSelector(state => state.login)
  var { actionModal, action, information } = useSelector(state => state.contest_card)
  return (
    <div className={"App"}>
          {/*<ErrorsModal />*/}
          <Switch>
          <Route path="/discord/redirect" component={DiscordAuthHandler}></Route> 
          <Route path="/spotify/redirect" component={SpotifyAuthHandler}></Route> 
          <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route> 
          <Route exact path={"/"} render={()=> <Redirect to='/landing-page' />}/>
          <Route exact path='/landing-page' render={()=> <LandingPage />} />
          <Route exact path='/login' render={()=>(currentUser) ? (<Redirect to='/dashboard'/>) : (<LoginPage/>) } />
          <Route exact path='/signup' render={()=>currentUser ? (<Redirect to='/'/>) : (<SignUpPage/>) } />
          <Route exact path='/contest/:title/:id' render={()=> ([
            <ActionModalContainer idContest={information.idContest} show={actionModal} action={action} />,
            <Contest />
          ])}/>
          <Route exact path='/dashboard/pie' render={()=> currentUser ? (<Dashboard />) : (<Redirect to='/'/>)} />
          <Route exact path='/dashboard/draft' render={()=> currentUser ?  (<Dashboard child={<DraftPage />} />) : (<Redirect to='/'/>)} />
          <Route exact path='/dashboard/settings' render={()=> currentUser ?  (<Dashboard />) : (<Redirect to='/'/>)} />
          <Route exact path="/dashboard/My Contests/new" render={()=> (
              <Redirect to="/dashboard/My Contests/new/firstStep" />
          )} />
          <Route exact path="/dashboard/My Contests/new/firstStep" render={()=> (
              (currentUser) ? (<Dashboard child={<NewContest child={ <ContestFirstStep />}/>} />) : (<Redirect to="/"/>)
          )} />
          <Route exact path="/dashboard/My Contests/new/secondStep" render={()=> (
              (currentUser) ? (<Dashboard child={<NewContest child={ <ContestSecondStep />}/>} />) : (<Redirect to="/"/>)
          )} />
          <Route exact path="/dashboard/My Contests/new/thirdStep" render={()=> (
              (currentUser) ? (<Dashboard child={<NewContest child={ <ContestThirdStep />}/>} />) : (<Redirect to="/"/>)
          )} />
          <Route exact path='/dashboard/My Contests' render={()=>
            (currentUser) ? (<Dashboard child={<DashboardContestPage/>} />) : (<Redirect to="/" />)
          }/>
          <Route exact path='/dashboard/My Contests/edit/:id' render={()=> (
              (currentUser) ? (<Dashboard child={<EditContest child={<EditContestFirstStep />} />} />):(<Redirect to='/'/>)
          )}/>
          <Route exact path='/dashboard/My Contests/result/:id' render={()=> (
              (currentUser) ? (<Dashboard child={<EditContest child={<EditContestSecondStep data={[]} />} />} />):(<Redirect to='/'/>)
          )}/>
          <Route exact path='/dashboard/Templates' render={()=>(currentUser) ? (<Dashboard child={<DashboardTemplatesPage />} />):(<Redirect to='/'/>)}/>
          <Route exact path='/dashboard' render={()=> (currentUser) ? (<Dashboard child={
            <DashboardHomePage />
          }/>):(<Redirect to='/'/>) } />
          <Route render={()=> (<Page404 />)} />
        </Switch>
    </div>
  );
}

export default App;