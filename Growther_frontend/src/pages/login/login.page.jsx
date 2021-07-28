import React from 'react';
import { connect } from 'react-redux';
import EmailInput from '../../Components/email-input/email-input.component';
import PasswordInput from '../../Components/password-input/password-input.component';
import SubmitButton from '../../Components/submit-button/submit-button.component';
import SocialMediaButton from '../../Components/social-media-button/social-media-button.component';
import SingupFirstStep from '../../Components/signup-first-step/signupFirstStep.component';
import SingupSecondStep from '../../Components/signup-second-step/signup-second-step.component';
import LoginForm from '../../Components/login-form/login-form.componenet';
import { loginWithEmailAndPassword } from '../../redux/auth/auth.actions';
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
        // console.log(e)
        this.setState(prev=>({
          ...prev,
          isInSecondStep:true,
          
        }));
        const user={email:"something@gmail.com" ,password:"hahahaha"}
        // console.log(user);
        console.log("statttt");
         this.props.loginWithEmailAndPassword(user)
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
        
        
    }
    handlePasswordChange= e =>{
        console.log(this.state)
        
    }
    handleRemeberMe=e =>{
      
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
  const { auth } = state
  return {currentUser : auth.currentUser}
}


const mapStatsToDispatch={
loginWithEmailAndPassword : loginWithEmailAndPassword
}

export default connect(mapStateToProps,mapStatsToDispatch)(LoginPage);