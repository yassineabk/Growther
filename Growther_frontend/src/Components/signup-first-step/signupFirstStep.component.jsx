import React from 'react'
import EmailInput from '../email-input/email-input.component';
import PasswordInput from '../password-input/password-input.component';
import SubmitButton from '../submit-button/submit-button.component';
import SocialMediaButton from '../social-media-button/social-media-button.component';
import { Link } from 'react-router-dom';
import { googleUri } from '../login-form/login_uri';
import { facebookUri } from '../login-form/login_uri';
import { useSelector } from 'react-redux';
import { Spinner } from '../spinner/spinner.component';

const SingupFirstStep=({handleSubmit,SignUpWithGoogle,SignUpWithFacebook,registrationMessage,errMessage,passwordFunctions,success,emailFunctions,isErrors,messages})=>{
    var {isLoading} = useSelector(state => state.registration)
    return(

    <section className="hero is-fullheight Modal">
            <div className="hero-body ">
                <Spinner show={isLoading} />
                <div className="container ">
                <div className="columns is-centered ">
                    <div className="column is-5-tablet is-4-desktop is-4-widescreen ">
                        <form action="" className="box" onSubmit={handleSubmit}>
                            <div className="column has-text-centered">
                                <p className="title is-3">Create an account</p>
                                <p className="subtitle ">Let's get you started</p>
                            </div>
                            <EmailInput handleBlur={emailFunctions.handleEmailBlur} handleChange={emailFunctions.handleEmailChange} label="Email" isError={isErrors.email} message={messages.email} placeholder="Enter Your email"/>
                            <PasswordInput handleChange={passwordFunctions.handlePasswordChange}  label="Password" isError={isErrors.password} message={messages.password} placeholder="Enter your password"/>
                            <PasswordInput handleBlur={passwordFunctions.handlePasswordConfirmationBlur}  label="Confirm Password" isError={isErrors.confiremed_password} message={messages.confiremed_password} placeholder="confirm your password"/>
                            <label className=" column mb-2 "><input type="checkbox" required />  I agree to the <Link to="/terms">terms and conditions</Link></label>
                            <SubmitButton message={errMessage} id="submitButton" type="submit" label="Sign Up"/>

                            <SocialMediaButton uri={googleUri} onClick={isLoading ? ()=> false : SignUpWithGoogle} isGoogle label="Sign Up with Google"/>
                            <SocialMediaButton uri={facebookUri} onClick={isLoading ? ()=> false : SignUpWithFacebook} label="Sign Up with Facebook"/>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </section>



)}
export default SingupFirstStep;