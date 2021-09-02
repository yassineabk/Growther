import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../Components/login-form/login-form.componenet';
import { loginWithEmailAndPassword } from '../../redux/login/login.actions';
import {setEmail,setPassword,setLoginError,setLoginErrorMessage,setRemember} from '../../redux/login/login.actions'
import { registerWithFacebookAndGoogle } from '../../redux/registration/registration.action';


class LoginPage extends React.Component{
   
    handleLoginWithEmail=async (e, dispatch)=>{
        e.preventDefault();
        this.emailValidation(this.props.email)
        this.passwordValidation(this.props.password)
        if(!this.props.errorMessage){
          const user={email:this.props.email ,password:this.props.password}
          loginWithEmailAndPassword(dispatch, user)
        }
       
    }


    handleEmailBlur=e =>{
        
    }

    passwordValidation = password=>{
      if (password.trim() === '') {
        this.props.setLoginError(true)
        this.props.setLoginErrorMessage('Password is required')
        }
      else if (password.trim().length < 8) {
        this.props.setLoginError(true)
        this.props.setLoginErrorMessage('Password should be more than 8 characters')  
      }else{
        this.props.setLoginError(false)
        this.props.setLoginErrorMessage('')
      }


    }
    emailValidation = email => {
      if (email.trim() === '') {
          this.props.setLoginError(true)
          this.props.setLoginErrorMessage('Email is required')
        }
      else if (
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email,)
      ) {
        this.props.setLoginError(false)
        this.props.setLoginErrorMessage('')
          
      }
        else{
          this.props.setLoginError(true)
          this.props.setLoginErrorMessage('Please enter a valid email')
        }
         
    };
    handleEmailChange= e =>{
        this.props.setEmail(e.target.value)
        this.emailValidation(e.target.value)

    }
    handlePasswordChange= e =>{
        this.props.setPassword(e.target.value)
        this.passwordValidation(e.target.value)
    }
    handleRemeberMe=e =>{
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
    registerWithFacebookAndGoogle:registerWithFacebookAndGoogle

}

export default connect(mapStateToProps,mapStatsToDispatch)(LoginPage);
