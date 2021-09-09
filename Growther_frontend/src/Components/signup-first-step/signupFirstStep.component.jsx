import React from 'react'
import EmailInput from '../email-input/email-input.component';
import PasswordInput from '../password-input/password-input.component';
import SubmitButton from '../submit-button/submit-button.component';
import SocialMediaButton from '../social-media-button/social-media-button.component';
import { Link } from 'react-router-dom';
import { googleUri } from '../login-form/login_uri';
import { facebookUri } from '../login-form/login_uri';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../spinner/spinner.component';
import { useTranslation } from "react-i18next";

const SingupFirstStep=({handleSubmit,SignUpWithGoogle,SignUpWithFacebook,registrationMessage,errMessage,passwordFunctions,success,emailFunctions,isErrors,messages})=>{
    var {isLoading} = useSelector(state => state.registration)
    const { t } = useTranslation();
    var {direction} = useSelector(state => state.userInfos)
    var dispatch = useDispatch()
    return(
        <section id="sign-up-infos" className="hero is-fullheight">
            <div className="hero-body ">
                <Spinner show={isLoading} />
                <div className="container ">
                <div className="columns is-centered ">
                    <div className="column is-5-tablet is-4-desktop is-4-widescreen ">
                        <form action="" className="box" onSubmit={event => handleSubmit(event, dispatch)}>
                            <div id="auth-title" className="column has-text-centered">
                                <p dir={direction ? direction : "ltr"} className="title is-3">{t("create_account")}</p>
                                <p dir={direction ? direction : "ltr"} className="subtitle is-6">{t("register_subheader")}</p>
                            </div>
                            <EmailInput handleBlur={emailFunctions.handleEmailBlur} handleChange={emailFunctions.handleEmailChange} label={t("email")} isError={isErrors.email} message={messages.email} placeholder={t("email_placeholder")}/>
                            <PasswordInput handleChange={passwordFunctions.handlePasswordChange}  label={"password"} isError={isErrors.password} message={messages.password} placeholder={t("password_placeholder")}/>
                            <PasswordInput handleBlur={passwordFunctions.handlePasswordConfirmationBlur}  label={"confirm_password"} isError={isErrors.confiremed_password} message={messages.confiremed_password} placeholder={t("confirm_password_placeholder")}/>
                            <label id="auth-checkbox" dir={direction ? direction : "ltr"} className="column mb-2"><input type="checkbox" required /> {t("agree")} <Link dir={direction ? direction : "ltr"} to="/terms" target="_blank">{t("terms")}</Link></label>
                            <SubmitButton message={errMessage} id="submitButton" type="submit" label={t("Signup")}/>
                            <SocialMediaButton uri={googleUri} onClick={isLoading ? ()=> false : SignUpWithGoogle} isGoogle label={"Sign Up with Google"}/>
                            <SocialMediaButton uri={facebookUri} onClick={isLoading ? ()=> false : SignUpWithFacebook} label={"Sign Up with Facebook"}/>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </section>
)}
export default SingupFirstStep;