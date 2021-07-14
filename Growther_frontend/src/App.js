import React from 'react';
import './App.css';
import {Switch ,Route,Redirect} from 'react-router-dom'
import Header from './Components/header/header.component'
import {connect} from 'react-redux'
import {setCurrentUser} from  './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selectors'
import {createStructuredSelector} from 'reselect'
import SignUpPage from './pages/sign-up/sign-up.component';
import LoginPage from './pages/login/login.component';

class App extends React.Component {
 
  unsubscribeFromAuth=null
  componentDidMount(){

    const {setCurrentUser}=this.props

    //auth logic here
  }



  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/login' render={()=>this.props.currentUser ? (<Redirect to='/'/>) : (<LoginPage/>) } />
          <Route exact path='/signup' render={()=>this.props.currentUser ? (<Redirect to='/'/>) : (<SignUpPage/>) } />
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