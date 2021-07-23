import React from 'react'
import EmailInput from '../email-input/email-input.component';
import PasswordInput from '../password-input/password-input.component';
import SubmitButton from '../submit-button/submit-button.component';
import SocialMediaButton from '../social-media-button/social-media-button.component';
import {Link} from 'react-router-dom'

const LoginForm=({handleSubmit,handleRemeberMe,SignUpWithGoogle,SignUpWithFacebook,password,passwordFunctions,email,emailFunctions})=>{
    console.log(email)
    return(

    <section className="hero is-fullheight ">
            <div className="hero-body ">
                <div className="container ">
                <div className="columns is-centered ">
                    <div className="column is-5-tablet is-4-desktop is-4-widescreen ">
                    <div className="column">
                      <p className="title is-3">Login</p>
                      <p className="subtitle is6">Welcome back</p>
                    </div>
                    <form action="" className="box" onSubmit={handleSubmit}>
                        <EmailInput handleBlur={emailFunctions.handleEmailBlur} handleChange={emailFunctions.handleEmailChange} label="Email" isError={email.isEmailError} message={email.EmailMessage} placeholder="Enter Your email"/>
                        <PasswordInput handleChange={passwordFunctions.handlePasswordChange}  label="Password" isError={password.isPasswordError} message={password.PasswordMessage} placeholder="Enter your password"/>
                        <div className="field is-flex is-flex-direction-row is-justify-content-space-between">
                            <label for="" className="checkbox">
                                <input onChange={handleRemeberMe} className="mr-3" type="checkbox"/>
                                Remember me
                            </label>
                            <Link className="subtitle is-danger is-6 is-link" to="Reset Password">I forgot my password</Link>
                            </div>
                        <div className="field"></div>
                        <SubmitButton type="submit" label="Login"/>
                        <SocialMediaButton onClick={SignUpWithGoogle} isGoogle label="Login with Google"/>
                        <SocialMediaButton onClick={SignUpWithFacebook} label="Login with Facebook"/>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </section>



)}
export default LoginForm;