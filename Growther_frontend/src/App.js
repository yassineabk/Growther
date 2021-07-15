import React from 'react';
import './App.scss';
import {Switch, Route, Redirect, useParams} from 'react-router-dom'
import Header from './Components/header/header.component'
import {connect} from 'react-redux'
import {setCurrentUser} from  './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selectors'
import {createStructuredSelector} from 'reselect'
<<<<<<< HEAD
import SignUpPage from './pages/sign-up/sign-up.component';
import Dashboard from './pages/dashboard/dashborad.component';
=======
import SignUpPage from './pages/sign-up/sign-up.page';
import LoginPage from './pages/login/login.page';
import Dashboard from './pages/dashboard/dashborad.page';

>>>>>>> ccb6c581c5487dc35ef6a65b56f821f7b77f8079

class App extends React.Component {
 
  unsubscribeFromAuth=null
  constructor(){
    super()
    this.state = {
<<<<<<< HEAD
      currentPath: window.location.pathname
    }
  }
  getPath = ()=>{
    this.setState({
      currentPath: window.location.pathname
    })  
  }
=======
      currentPath: ""
    }
  }
>>>>>>> ccb6c581c5487dc35ef6a65b56f821f7b77f8079
  componentDidMount(){

    this.getPath()
    const {setCurrentUser}=this.props
<<<<<<< HEAD
    
=======
    this.setState({
      currentPath: window.location.pathname
    })

>>>>>>> ccb6c581c5487dc35ef6a65b56f821f7b77f8079
    //auth logic here
  }

  render(){
    return (
      <div className={this.state.currentPath.includes("dashboard") ? "App bgcolor" : "App"}>
        <Header/>
        <Switch>
<<<<<<< HEAD
          <Route exact path='/signup' render={()=> this.props.currentUser ? (<Redirect to='/'/>) : (<SignUpPage/>) } />
=======
          <Route exact path='/login' render={()=>this.props.currentUser ? (<Redirect to='/'/>) : (<LoginPage/>) } />
          <Route exact path='/signup' render={()=>this.props.currentUser ? (<Redirect to='/'/>) : (<SignUpPage/>) } />
>>>>>>> ccb6c581c5487dc35ef6a65b56f821f7b77f8079
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