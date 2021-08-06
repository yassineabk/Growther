import React from 'react'
import EmailInput from '../email-input/email-input.component';
import PasswordInput from '../password-input/password-input.component';
import SubmitButton from '../submit-button/submit-button.component';
import SocialMediaButton from '../social-media-button/social-media-button.component';
import {Link, useHistory} from 'react-router-dom'
import { googleUri } from './login_uri';
import { facebookUri } from './login_uri';
import { Spinner } from '../spinner/spinner.component';
import { useSelector } from 'react-redux';
//import { useTranslation } from "react-i18next";

const LoginForm=({handleSubmit,handleRemeberMe,SignUpWithGoogle,SignUpWithFacebook,registrationMessage,passwordVlue,passwordFunctions,emailValue,email,password,emailFunctions})=>{
    //const { t } = useTranslation();
    const history = useHistory();
    var {isLoading} = useSelector(state => state.login)
  function handleClickRegister() {
    history.push("/signup");
    
  }
    return(

    [
        <section className="hero is-fullheight Modal">
            <div className="hero-body ">
                <Spinner show={isLoading} />,
                <div className="container ">
                <div className="columns is-centered ">
                    <div className="column is-5-tablet is-4-desktop is-4-widescreen ">
                    <form action="" className="box" onSubmit={handleSubmit}>
                        <div className="column has-text-centered">
                        <p className="title is-3">{/*{t("login")}*/}login</p>
                        <p className="subtitle is6">{/*t("welcome_back")*/}welcome_back</p>
                        </div>
                        <EmailInput value={emailValue} handleBlur={emailFunctions.handleEmailBlur} handleChange={emailFunctions.handleEmailChange} label="Email" isError={email.isEmailError} message={email.EmailMessage} placeholder="Enter Your email"/>
                        <PasswordInput value={passwordVlue} handleChange={passwordFunctions.handlePasswordChange}  label="Password" isError={password.isPasswordError} message={password.PasswordMessage} placeholder="Enter your password"/>
                        <div className="field is-flex-desktop is-flex-direction-row is-justify-content-space-between">
                            <label for="" className="checkbox is-block">
                                <input onChange={handleRemeberMe} className="mr-3" type="checkbox"/>
                                {/*t("remember_me")*/}remember_me
                            </label>
                            <Link className="subtitle is-danger is-6 is-link" to="Reset Password">I forgot my password</Link>
                            </div>
                        <div className="field"></div>
                        <SubmitButton message={registrationMessage} id="submitButton" type="submit" label="Login"/>
                        <SocialMediaButton uri={googleUri} onClick={ isLoading ? ()=> false : SignUpWithGoogle} isGoogle label="Login with Google"/>
                        <SocialMediaButton uri={facebookUri} onClick={isLoading ? ()=> false : SignUpWithFacebook} label="Login with Facebook"/>
                        <SubmitButton onClick={isLoading ? ()=> false : handleClickRegister} className="details-button" type="button" label="Sign up"/>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </section>
    ]



)}
export default LoginForm;