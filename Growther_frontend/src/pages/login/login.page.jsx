import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from '../../Components/login-form/login-form.componenet';
import { loginWithEmailAndPassword } from '../../redux/login/login.actions';
import {setEmail,setPassword,setLoginError,setLoginErrorMessage,setRemember} from '../../redux/login/login.actions'
import OAuth2RedirectHandler from '../../services/OAuth2-redirect-handler';

class LoginPage extends React.Component{
    constructor(){
        super()
        this.state={
            displayName:'',
            password:{
              password:'',
              PasswordMessage:'',
              isPasswordError:null
            },
            email:{
              email:'',
              EmailMessage:'',
              isEmailError:null,
            },
           
        }
    }
    handleLoginWithEmail=async e=>{
        e.preventDefault();
      
        const user={email:this.props.email ,password:this.props.password}
        console.log(user)
        this.props.loginWithEmailAndPassword(user)
    }

    LoginWithGoogle=async e=>{
      
      console.log(e)

    }
    LoginWithFacebook=async e=>{
      
      window.open("https://staging-backendapp.herokuapp.com/oauth2/authorize/facebook?redirect_uri=http://localhost:3000/oauth2/redirect")


    }

    handleEmailBlur=e =>{
        
    }
    handleEmailChange= e =>{
        this.props.setEmail(e.target.value)
        
    }
    handlePasswordChange= e =>{
        this.props.setPassword(e.target.value)
    }
    handleRemeberMe=e =>{
      console.log(e.target.value)
      this.props.setRemember(!this.props.remember)
    }
    

   
  

    render(){
      const emailFunctions={
        handleEmailBlur:this.handleEmailBlur,
        handleEmailChange:this.handleEmailChange,
      }
      const PasswordFunctions={
        handlePasswordChange:this.handlePasswordChange,
      }
        return(
         
          
                <LoginForm
                    handleSubmit={this.handleLoginWithEmail}
                    SignUpWithGoogle={this.LoginWithGoogle}
                    SignUpWithFacebook={this.LoginWithFacebook}
                    password={this.props.password}
                    passwordFunctions={PasswordFunctions}
                    email={this.props.email}
                    emailFunctions={emailFunctions}
                    handleRemeberMe={this.handleRemeberMe}
                    registrationMessage={this.props.errorMessage}
                    emailValue={this.props.email}
                    passwordVlue={this.props.password}

                />

            
         
          
         
        
        )
    }




}
function mapStateToProps(state) {
  return {

          password:state.login.password,
          email:state.login.email,
          remember:state.login.remember,
          errorMessage:state.login.errorMessage
        }
}


const mapStatsToDispatch={
    loginWithEmailAndPassword : loginWithEmailAndPassword,
    setEmail:(email)=>setEmail(email),
    setPassword:(password)=>setPassword(password),
    setLoginErrorMessage:(message)=>setLoginErrorMessage(message),
    setLoginError:(bool)=>setLoginError(bool),
    setRemember:(bool)=>setRemember(bool),

}

export default connect(mapStateToProps,mapStatsToDispatch)(LoginPage);
