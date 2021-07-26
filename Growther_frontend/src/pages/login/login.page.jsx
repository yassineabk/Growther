import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../Components/login-form/login-form.componenet';
import { loginWithEmailAndPassword } from '../../redux/auth/auth.actions';
import {setEmail,setPassword,setLoginError,setLoginErrorMessage,setRemember} from '../../redux/login/login.actions'
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
        console.log(e)
        this.setState(prev=>({
          ...prev,
          isInSecondStep:true,
          
        }));
        const user={email:this.state.email.email ,password:this.state.password.password}
        loginWithEmailAndPassword(user)
    }

    LoginWithGoogle=async e=>{
      console.log("Google")
      this.setState(prev=>({
        ...prev,
        isInSecondStep:true,
        
      })); 

    }
    LoginWithFacebook=async e=>{
      console.log("Facebook")
      this.setState(prev=>({
        ...prev,
        isInSecondStep:true,
        
      })); 

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
                    password={this.state.password}
                    passwordFunctions={PasswordFunctions}
                    email={this.state.email}
                    emailFunctions={emailFunctions}
                    handleRemeberMe={this.handleRemeberMe}
                />

            
         
          
         
        
        )
    }




}
function mapStateToProps(state) {
  return {currentUser : state.auth.currentUser,
          password:state.login.password,
          email:state.login.email,
          remember:state.login.remember
        }
}


const mapStatsToDispatch={
    loginWithEmailAndPassword : loginWithEmailAndPassword,
    setEmail:(email)=>setEmail(email),
    setPassword:(password)=>setPassword(password),
    setLoginErrorMessage:(message)=>setLoginErrorMessage(message),
    setLoginError:(bool)=>setLoginError(bool),
    setRemember:(bool)=>setRemember(bool)
}

export default connect(mapStateToProps,mapStatsToDispatch)(LoginPage);
