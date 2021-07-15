import React from 'react';
import './App.scss';
import {Switch, Route, Redirect, useParams} from 'react-router-dom'
import Header from './Components/header/header.component'
import {connect} from 'react-redux'
import {setCurrentUser} from  './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selectors'
import {createStructuredSelector} from 'reselect'
import SignUpPage from './pages/sign-up/sign-up.page';
import LoginPage from './pages/login/login.page';
import Dashboard from './pages/dashboard/dashborad.page';


class App extends React.Component {
 
  unsubscribeFromAuth=null
  constructor(){
    super()
    this.state = {
      currentPath: ""
    }
  }
  componentDidMount(){

    const {setCurrentUser}=this.props
    this.setState({
      currentPath: window.location.pathname
    })

    //auth logic here
  }



  render(){
    return (
      <div className={this.state.currentPath.includes("dashboard") ? "App bgcolor" : "App"}>
        <Header/>
        <Switch>
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
  currentUser:selectCurrentUser
})

const mapDispatcToProps=dispatch=>({
   setCurrentUser: user=>dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatcToProps)(App);