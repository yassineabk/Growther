import React from 'react'
import EmailInput from '../email-input/email-input.component';
import PasswordInput from '../password-input/password-input.component';
import SubmitButton from '../submit-button/submit-button.component';
import SocialMediaButton from '../social-media-button/social-media-button.component';
import {Link, useHistory} from 'react-router-dom'
import { googleUri } from './login_uri';
import { facebookUri } from './login_uri';
import { Spinner } from '../spinner/spinner.component';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

const LoginForm=({handleSubmit,handleRemeberMe,SignUpWithGoogle,SignUpWithFacebook,registrationMessage,passwordVlue,passwordFunctions,emailValue,email,password,emailFunctions})=>{
    const { t } = useTranslation();
    const history = useHistory();
    var {direction} = useSelector(state => state.userInfos)
    var {isLoading} = useSelector(state => state.login)
    function handleClickRegister() {
        history.push("/signup");
    }
    var dispatch = useDispatch()
    return(

    [
        <section id="sign-up-infos" className="hero is-fullheight Modal">
            <div className="hero-body ">
                <Spinner show={isLoading} />,
                <div className="container ">
                <div className="columns is-centered ">
                    <div className="column is-5-tablet is-4-desktop is-4-widescreen">
                    <form action="" className="box" onSubmit={event => handleSubmit(event, dispatch)}>
                        <div id="auth-title" className="column has-text-centered">
                            <p dir={direction ? direction : "ltr"} className="title is-3">{t("login")}</p>
                            <p dir={direction ? direction : "ltr"} className="subtitle is-6">{t("welcome_back")}</p>
                        </div>
                        <EmailInput value={emailValue} handleBlur={emailFunctions.handleEmailBlur} handleChange={emailFunctions.handleEmailChange} label="Email" isError={email.isEmailError} message={email.EmailMessage} placeholder={t("email_placeholder")}/>
                        <PasswordInput value={passwordVlue} handleChange={passwordFunctions.handlePasswordChange}  label="Password" isError={password.isPasswordError} message={password.PasswordMessage} placeholder={t("password_placeholder")}/>
                        <div dir={direction ? direction : "ltr"} id="auth-checkbox" className="field is-flex-desktop is-flex-direction-row is-justify-content-space-between">
                            <label dir={direction ? direction : "ltr"} for="" className="checkbox is-block">
                                <input onChange={handleRemeberMe} className={`${direction === "rtl" ? "ml-2" : "mr-2"}`} type="checkbox"/>
                                {t("remember_me")}
                            </label>
                            <Link dir={direction ? direction : "ltr"} className="subtitle is-danger is-6 is-link" to="Reset Password">{t("forget_password")}</Link>
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