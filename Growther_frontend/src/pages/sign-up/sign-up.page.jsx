import React from 'react';
import { connect } from 'react-redux';
import SingupFirstStep from '../../Components/signup-first-step/signupFirstStep.component';
import SingupSecondStep from '../../Components/signup-second-step/signup-second-step.component';
import {registerWithEmailAndPassword, registerWithFacebookAndGoogle} from '../../redux/registration/registration.action'
import { SignupUserType } from '../../Components/signup-user-type/signup-user-type.component';
import {SetEmail,setRegistrationErrorMessage, SetPassword,SetConfirmationPassword,SetEmailError,SetEmailErrorMessage,SetPasswordError,SetPasswordErrorMessage,SetPasswordConfirmationError,SetPasswordConfirmationErrorMessage,SetUserType,ToogleSecondStep,ToogleThirddStep,setBrandName,setBrandNameError,setBrandNameErrorMessage,setBrandUrl,setBrandUrlError,setBrandUrlErrorMessage,setBrandActvity,setBrandActvityError,setBrandActvityErrorMessage,setIndividualName,setIndividualNameErrorMessage,setIndividualNameError} from '../../redux/registration/registration.action'
import { FRONTEND_API } from '../../services/links';

class SignUpPage extends React.Component{
    SignUpWithGoogle = e =>{
      if(this.props.isBrand){
            const user={
              name:this.props.brand.name,
              url:this.props.brand.url,
              activities:this.props.brand.activities,

              isBrand:"true"

            }
            localStorage.setItem("user", JSON.stringify(user))
          }else{
            const user={
              name:this.props.individual.name,
              isBrand:"false"
            }
            localStorage.setItem("user", JSON.stringify(user))
          }
    }
    handleSubmitFirstStep=async e=>{
        e.preventDefault();
        const email =this.props.email
        const password= this.props.password
        const confiremedPassword=this.props.confiremedPassword
        this.emailValidation(email)
        this.passwordValidation(password)
        this.confirmedPsswordValidation(confiremedPassword)
        
        
      if(this.props.isBrand){
            const user={
              email:email,
              password:password,
              name:this.props.brand.name,
              url:this.props.brand.url,
              activities:this.props.brand.activities,

              isBrand:"true"

            }
            this.props.setRegistrationError(false)
            
            this.props.registerWithEmailAndPassword(user)
          }else{
            const user={
              email:email,
              password:password,
              name:this.props.individual.name,
              isBrand:"false"
            }
            this.props.setRegistrationError(false)
            this.props.registerWithEmailAndPassword(user)
          }
    }

  handleClickLogin() {
    //this.props.history.push("/login");
    window.location.href=`${FRONTEND_API}/login`
  }

    handleSubmitSecondStep=async e=>{
      e.preventDefault();
      this.props.toogleThirddStep(true)
      this.props.toogleSecondStep(false)
      
    }


    SignUpWithFacebook=async e=>{
       
    }



    

      passwordValidation = password=>{
        if (password.trim() === '') {
          this.props.setPasswordError(true)
          this.props.setPasswordErrorMessage('Password is required')
          }
        else if (password.trim().length < 8) {
          this.props.setPasswordError(true)
          this.props.setPasswordErrorMessage('Password should be more than 8 characters')  
        }else{
          this.props.setPasswordError(false)
          this.props.setPasswordErrorMessage('')
        }


      }
    handleEmailBlur=e =>{
      this.props.setEmail(e.target.value)
      this.emailValidation(e.target.value)
        
    }
    handleEmailChange=e =>{
    }
    emailValidation = email => {
      if (email.trim() === '') {
          this.props.setEmailError(true)
          this.props.setEmailErrorMessage('Email is required')
        }
      else if (
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email,)
      ) {
        this.props.setEmailError(false)
        this.props.setEmailErrorMessage('')
          
      }
        else{
          this.props.setEmailError(true)
          this.props.setEmailErrorMessage('Please enter a valid email')
        }
         
    };

    confirmedPsswordValidation=(confirmedPssword)=>{
      if(confirmedPssword===this.props.password){
        this.props.setPasswordConfirmationError(false)
        this.props.setPasswordConfirmationErrorMessage('')
        
    }else{
      this.props.setPasswordConfirmationError(true)
      this.props.setPasswordConfirmationErrorMessage("password doesn't match")
    }     
    }

    handlePasswordChange= e =>{
        this.props.setPassword(e.target.value)
        this.passwordValidation(e.target.value)
        
    }
    handlePasswordConfirmationBlur= e =>{
      this.props.setConfirmationPassword(e.target.value)
      this.confirmedPsswordValidation(e.target.value)
    }

    
    handleBrandNameBlur=e =>{
      const BrandName=e.target.value
      if(BrandName.trim()===""){
        this.props.setBrandNameError(true)
        this.props.setBrandNameErrorMessage('Brand Name is required')
       
      }else{
        this.props.setBrandName(BrandName)
        this.props.setBrandNameError(false)
        this.props.setBrandNameErrorMessage('')

      }
      
    }
    handleBrandUrlBlur=e =>{
      const BrandUrl=e.target.value
      if(BrandUrl.trim()===""){
        this.props.setBrandUrlError(true)
        this.props.setBrandUrlErrorMessage('url is required')
        
      }else{
        this.props.setBrandUrlError(false)
        this.props.setBrandUrlErrorMessage('')
        this.props.setBrandUrl(BrandUrl)
        
      }
      
    }
    handleBrandActivitiesBlur=e =>{
      const BrandActivities=e.target.value
      if(BrandActivities.trim()===""){
        this.props.setBrandActvityError(true)
        this.props.setBrandActvityErrorMessage('Activitiy is required')
         
      }else{
        this.props.setBrandActvityError(false)
        this.props.setBrandActvityErrorMessage('')
        this.props.setBrandActvity(BrandActivities)
         
        
      }
      
    }
    handleIndividualNameBlur=e =>{
      const IndividualName=e.target.value
      if(IndividualName.trim()===""){
        this.props.setIndividualNameError(true)
        this.props.setIndividualNameErrorMessage('name is required')
        
      }else{
        this.props.setIndividualNameError(false)
        this.props.setIndividualNameErrorMessage('')
        this.props.setIndividualName(IndividualName)
        
        
        
      }
      
    }
    
    handleUserType=e=>{
     const name=e.target.name
      if(name==="brand"){
        this.props.setUserType(true)
      }else if(name==="individual"){
        this.props.setUserType(false)

      }


    }

    handleUserTypeSubmit=e=>{
      e.preventDefault()
      this.props.toogleSecondStep(true)
    }



    render(){
      const emailFunctions={
        handleEmailBlur:this.handleEmailBlur,
        handleEmailChange:this.handleEmailChange
      }
      const PasswordFunctions={
        handlePasswordChange:this.handlePasswordChange,
        handlePasswordConfirmationBlur:this.handlePasswordConfirmationBlur

      }
      const BrandFunctions={
        handleBrandNameBlur:this.handleBrandNameBlur,
        handleBrandUrlBlur:this.handleBrandUrlBlur,
        handleBrandActivitiesBlur:this.handleBrandActivitiesBlur
      }
      const IndividualFunctions={
        handleIndividualNameBlur:this.handleIndividualNameBlur
      }
      if(this.props.isSecondStep){
        return(
          <SingupSecondStep
            handleSubmit={this.handleSubmitSecondStep}
            individual={this.props.individual}
            brand={this.props.brand}
            BrandFunctions={BrandFunctions}
            IndividualFunctions={IndividualFunctions}
            isBrand={this.props.isBrand}
          />
        )
         
      }if(this.props.isThirdStep){
        return(
          <SingupFirstStep
            handleSubmit={this.handleSubmitFirstStep}
            SignUpWithGoogle={this.SignUpWithGoogle}
            SignUpWithFacebook={this.SignUpWithFacebook}
            password={this.props.password}
            passwordFunctions={PasswordFunctions}
            email={this.props.email}
            emailFunctions={emailFunctions}
            isErrors={this.props.isError}
            messages={this.props.errorMessages}
            errMessage={this.props.errorMessages.registration}
          /> 
        )
      }else{
        return(<SignupUserType 
          handleClick={this.handleUserType} 
          isBrand={this.props.isBrand} 
          handleSubmit={this.handleUserTypeSubmit}/>)
      }
       
}
}


function mapStateToProps(state) {
    return {
      
            email:state.registration.email,
            password:state.registration.password,
            confiremedPassword:state.registration.confiremed_password,
            isSecondStep:state.registration.isSecondStep,
            isThirdStep:state.registration.isThirdStep,
            isBrand:state.registration.isBrand,
            errorMessages:state.registration.errorMessage,
            isError:state.registration.isError,
            individual:state.registration.individual,
            brand:state.registration.brand,
            success:state.registration.success,
    }
}


const mapStatsToDispatch={
  registerWithEmailAndPassword : registerWithEmailAndPassword,
  registerWithFacebookAndGoogle: registerWithFacebookAndGoogle,
  setEmail:(email)=>SetEmail(email),
  setPassword:(password)=>SetPassword(password),
  setConfirmationPassword:(password)=>SetConfirmationPassword(password),
  setEmailError:(bool)=>SetEmailError(bool),
  setEmailErrorMessage:(message)=>SetEmailErrorMessage(message),
  setPasswordError:(bool)=>SetPasswordError(bool),
  setPasswordErrorMessage:(message)=>SetPasswordErrorMessage(message),
  setPasswordConfirmationError:(bool)=>SetPasswordConfirmationError(bool),
  setPasswordConfirmationErrorMessage:(message)=>SetPasswordConfirmationErrorMessage(message),
  setUserType:(bool)=>SetUserType(bool),
  toogleSecondStep:(bool)=>ToogleSecondStep(bool),
  toogleThirddStep:(bool)=>ToogleThirddStep(bool),
  setBrandName:(name)=>setBrandName(name),
  setBrandNameError:(bool)=>setBrandNameError(bool),
  setBrandNameErrorMessage:(message)=>setBrandNameErrorMessage(message),
  setBrandUrl:(name)=>setBrandUrl(name),
  setBrandUrlError:(bool)=>setBrandUrlError(bool),
  setBrandUrlErrorMessage:(message)=>setBrandUrlErrorMessage(message),
  setBrandActvity:(name)=>setBrandActvity(name),
  setBrandActvityError:(bool)=>setBrandActvityError(bool),
  setBrandActvityErrorMessage:(message)=>setBrandActvityErrorMessage(message),
  setIndividualName:(name)=>setIndividualName(name),
  setIndividualNameError:(bool)=>setIndividualNameError(bool),
  setIndividualNameErrorMessage:(message)=>setIndividualNameErrorMessage(message),
  setRegistrationError:(bool)=>setRegistrationErrorMessage(bool),
  setRegistrationErrorMessage:(message)=>setRegistrationErrorMessage(message)
}


export default connect(mapStateToProps,mapStatsToDispatch)(SignUpPage);
