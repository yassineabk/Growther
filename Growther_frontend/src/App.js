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
    return (
      <div className={this.state.currentPath.includes("dashboard") ? "App bgcolor" : "App"}>
        <Switch>
          <Route exact path='/landing-page' render={()=>this.props.currentUser ? (<Redirect to='/'/>) : (<LandingPage/>) } />
          <Route exact path='/login' render={()=>this.props.currentUser ? (<Redirect to='/'/>) : (<LoginPage/>) } />
          <Route exact path='/signup' render={()=>this.props.currentUser ? (<Redirect to='/'/>) : (<SignUpPage/>) } />
          <Route exact path='/dashboard/pie' render={()=> this.props.currentUser ? (<Redirect to='/'/>) : (<Dashboard currentUser={this.props.currentUser} />) } />
          <Route exact path='/dashboard/settings' render={()=> this.props.currentUser ? (<Redirect to='/'/>) : (<Dashboard currentUser={this.props.currentUser} />) } />
          <Route path='/dashboard' render={()=> this.props.currentUser ? (<Redirect to='/'/>) : (<Dashboard currentUser={this.props.currentUser} />) } />
        </Switch>
      </div>
    );
  }
}


const mapStateToProps=createStructuredSelector({
})

const mapDispatcToProps=dispatch=>({
})

export default connect(mapStateToProps,mapDispatcToProps)(App);