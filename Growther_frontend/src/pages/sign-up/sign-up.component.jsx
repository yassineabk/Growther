import React from 'react';
import EmailInput from '../../Components/email-input/email-input.component';
import PasswordInput from '../../Components/password-input/password-input.component';
import SubmitButton from '../../Components/submit-button/submit-button.component';
import SocialMediaButton from '../../Components/social-media-button/social-media-button.component';
import SingupFirstStep from '../../Components/signupFirstStep/signupFirstStep.component';
import SingupSecondStep from '../../Components/signupSecondStep/signupSecondStep.component';


class SignUpPage extends React.Component{
    constructor(){
        super()
        this.state={
            displayName:'',
            password:{
              password:'',
              confirmPassword:'',
              PasswordMessage:'',
              isPasswordError:null,
              PasswordConfirmationMessage:'',
              isPasswordConfirmationMessage:null
            },
            email:{
              email:'',
              EmailMessage:'',
              isEmailError:null,
            },
            isInSecondStep:false,
            brand:{
              isBrand:true,
              name:'',
              isNameError:false,
              nameErrorMessage:'',
              url:'',
              isUrlError:false,
              urlErrorMessage:'',
              activities:'',
              isActivitiesError:false,
              activitiesErrorMessage:''
            },
            individual:{
              name:'',
              isNameError:false,
              nameErrorMessage:''
            }
            
            
        }
    }
    handleSubmitFirstStep=async e=>{
        e.preventDefault();
        console.log(e)
        this.setState(prev=>({
          ...prev,
          isInSecondStep:true,
          
        }));   
    }
    handleSubmitSecondStep=async e=>{
      e.preventDefault();
      console.log(e)
      console.log(this.state)
      console.log("done")
  }
    SignUpWithGoogle=async e=>{
      console.log("Google")
      this.setState(prev=>({
        ...prev,
        isInSecondStep:true,
        
      })); 

    }
    SignUpWithFacebook=async e=>{
      console.log("Facebook")
      this.setState(prev=>({
        ...prev,
        isInSecondStep:true,
        
      })); 

    }



    emailValidation = email => {
        if (email.trim() === '') {
            console.log("empty")
            this.setState(prev=>({
              ...prev,
              email:{
                ...prev.email,
                EmailMessage:'Email is required',
                isEmailError:true
              }
            }));
            console.log(this.state.isEmailError)
          }
        else if (
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email,)
        ) {
            console.log('get')
            this.setState(prev=>({
            ...prev,
            email:{
              ...prev.email,
              email:email,
              EmailMessage:'',
              isEmailError:false
            }
            
          }));        }
          else{
            this.setState(prev=>({
                ...prev,
                email:{
                  ...prev.email,
                  EmailMessage:'Please enter a valid email',
                  isEmailError:true
                }
                
              }));
          }
        
        
      };

      passwordValidation = password=>{
        if (password.trim() === '') {
            this.setState(prev=>({
              ...prev,
              password:{
                ...prev.password,
                PasswordMessage:'Password is required',
                isPasswordError:true
              }
              
            }));
          }
        else if (password.trim().length < 8) {
            this.setState(prev=>({
            ...prev,
            password:{
              ...prev.password,
              PasswordMessage:'Password should be more than 8 characters',
              isPasswordError:true
            }
            
          }));   
        }else{
            this.setState(prev=>({
                ...prev,
                password:{
                  ...prev.password,
                  password:password,
                  PasswordMessage:'',
                  isPasswordError:false
                }
                
              }));  
        }


      }
    handleEmailBlur=e =>{
        this.emailValidation(e.target.value)
    }
    handleEmailChange= e =>{
        this.emailValidation(e.target.value)
        
    }
    handlePasswordChange= e =>{
        this.passwordValidation(e.target.value)
        console.log(this.state)
        
    }
    handlePasswordConfirmationBlur= e =>{
        this.passwordValidation(e.target.value)
        const confirmedPssword=e.target.value;
        console.log(this.state.password.password)
        console.log(confirmedPssword)
        if(confirmedPssword===this.state.password.password){
          console.log(true)
            this.setState(prev=>({
                ...prev,
                password:{
                  ...prev.password,
                  PasswordConfirmationMessage:'',
                  isPasswordConfirmationMessage:false
                }
                
              }));  
        }else{
            this.setState(prev=>({
                ...prev,
                password:{
                  ...prev.password,
                  PasswordConfirmationMessage:"password doesn't match",
                  isPasswordConfirmationMessage:true
                }
                
              }));  
        }       
    }

    handleUserTypeRadioButton=e=>{
      const userType=e.target.id
      if(userType==='brand'){
        this.setState(prev=>({
          ...prev,
          brand:{
            ...prev.brand,
            isBrand:true
          }
          
        }));  
      }else if(userType==='individual'){
        this.setState(prev=>({
          ...prev,
          brand:{
            ...prev.brand,
            isBrand:false
          }
          
        }));  
      } 
    }
    handleBrandNameBlur=e =>{
      const BrandName=e.target.value
      if(BrandName.trim()===""){
        this.setState(prev=>({
          ...prev,
          brand:{
            ...prev.brand,
            isNameError:true,
            nameErrorMessage:'Brand Name is required'
          }
          
        })); 
      }else{
        this.setState(prev=>({
          ...prev,
          brand:{
            ...prev.brand,
            name:BrandName,
            isNameError:false,
            nameErrorMessage:''
          }
          
        }));  
      }
      
    }
    handleBrandUrlBlur=e =>{
      const BrandUrl=e.target.value
      if(BrandUrl.trim()===""){
        this.setState(prev=>({
          ...prev,
          brand:{
            ...prev.brand,
            isUrlError:true,
            urlErrorMessage:'url is required'
          }
          
        }));  
      }else{
        this.setState(prev=>({
          ...prev,
          brand:{
            ...prev.brand,
            url:BrandUrl,
            isUrlError:false,
            urlErrorMessage:''
          }
          
        }));  
      }
      
    }
    handleBrandActivitiesBlur=e =>{
      const BrandActivities=e.target.value
      if(BrandActivities.trim()===""){
        this.setState(prev=>({
          ...prev,
          brand:{
            ...prev.brand,
            isActivitiesError:true,
            activitiesErrorMessage:'Activitiy is required'
          }
          
        }));  
      }else{
        this.setState(prev=>({
          ...prev,
          brand:{
            ...prev.brand,
            activities:BrandActivities,
            isActivitiesError:false,
            activitiesErrorMessage:''
          }
          
        }));  
      }
      
    }
    handleIndividualNameBlur=e =>{
      const IndividualName=e.target.value
      if(IndividualName.trim()===""){
        this.setState(prev=>({
          ...prev,
          individual:{
            ...prev.brand,
            isNameError:true,
            nameErrorMessage:'name is required'
          }
          
        }));  
      }else{
        this.setState(prev=>({
          ...prev,
          individual:{
            ...prev.brand,
            name:IndividualName,
            isNameError:false,
            nameErrorMessage:''

          }
          
        }));  
      }
      
      console.log(this.state)

    }
    

    render(){
      const emailFunctions={
        handleEmailBlur:this.handleEmailBlur,
        handleEmailChange:this.handleEmailChange,
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

        return(
         
           this.state.isInSecondStep ? (
                <SingupSecondStep
                    handleSubmit={this.handleSubmitSecondStep}
                    handleChange={this.handleUserTypeRadioButton}
                    individual={this.state.individual}
                    brand={this.state.brand}
                    BrandFunctions={BrandFunctions}
                    IndividualFunctions={IndividualFunctions}
                    isBrand={this.state.brand.isBrand}
                />
           ):(
              <SingupFirstStep
                    handleSubmit={this.handleSubmitFirstStep}
                    SignUpWithGoogle={this.SignUpWithGoogle}
                    SignUpWithFacebook={this.SignUpWithFacebook}
                    password={this.state.password}
                    passwordFunctions={PasswordFunctions}
                    email={this.state.email}
                    emailFunctions={emailFunctions}
              
              /> 
            
           )
         
          
         
        
        )
    }




}

export default SignUpPage;
