import React from 'react';
import 'bulma/css/bulma.min.css';
import './App.scss';
import {Switch, Route, Redirect, useParams} from 'react-router-dom'
import Header from './Components/header/header.component'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import SignUpPage from './pages/sign-up/sign-up.page';
import LoginPage from './pages/login/login.page';
import Dashboard from './pages/dashboard/dashborad.page';
import LandingPage from './pages/landing-page/landing-page.page';
import { Contest } from "./pages/contest/contest.page"
import { EditContest } from './Components/contest/edit-contest/edit-contest.component';
import OAuth2RedirectHandler from './services/OAuth2-redirect-handler';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
 
  unsubscribeFromAuth=null
  constructor(){
    super()
    this.state = {
      currentPath: window.location.pathname
    }
  }
  getPath = ()=>{
    this.setState({
      currentPath: window.location.pathname
    })  
  }
  componentDidMount(){

    this.getPath()
    const {setCurrentUser}=this.props
    
    //auth logic here
  }

  render(){
    console.log(this.props.currentUser);
    return (
      <div className={this.state.currentPath.includes("dashboard") ? "App bgcolor" : "App"}>
        <Switch>
          <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route> 
          <Route exact path='/landing-page' render={()=>this.props.currentUser ? (<Redirect to='/'/>) : (<LandingPage />) } />
          <Route exact path='/login' render={()=>(this.props.currentUser) ? (<Redirect to='/dashboard'/>) : (<LoginPage/>) } />
          <Route exact path='/signup' render={()=>this.props.currentUser ? (<Redirect to='/'/>) : (<SignUpPage/>) } />
          <Route exact path='/contest/:id' render={()=>this.props.currentUser ? (<Redirect to='/'/>) : (<Contest />) }/>
          <Route exact path='/contest/:id/edit' render={()=>this.props.currentUser ? (<Redirect to='/'/>) : (<EditContest />) }/>
          <Route exact path='/dashboard/pie' render={()=> this.props.currentUser ? (<Redirect to='/'/>) : (<Dashboard currentUser={this.props.currentUser} />) } />
          <Route exact path='/dashboard/settings' render={()=> this.props.currentUser ? (<Redirect to='/'/>) : (<Dashboard currentUser={this.props.currentUser} />) } />
          <Route exact path='/dashboard'  render={()=> (this.props.currentUser) ? (<Dashboard/>):(<Redirect to='/'/>) } />
        </Switch>
      </div>
    );
  }
}


const mapStateToProps=(state)=>{
  console.log(state.login)
  return({
    currentUser:state.login.currentUser
  })
}

const mapDispatcToProps=dispatch=>({
})

export default connect(mapStateToProps,mapDispatcToProps)(App);