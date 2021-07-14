import React from 'react'
import EmailInput from '../email-input/email-input.component';
import PasswordInput from '../password-input/password-input.component';
import SubmitButton from '../submit-button/submit-button.component';
import SocialMediaButton from '../social-media-button/social-media-button.component';

const SingupFirstStep=({handleSubmit,SignUpWithGoogle,SignUpWithFacebook,password,passwordFunctions,email,emailFunctions})=>{
    console.log(email)
    return(

    <section className="hero is-fullheight">
            <div className="hero-body ">
                <div className="container ">
                <div className="columns is-centered ">
                    <div className="column is-5-tablet is-4-desktop is-4-widescreen ">
                    <div className="column">
                      <p className="title is-3">Create an account</p>
                      <p className="subtitle is6">Let's get you started</p>
                    </div>
                    <form action="" className="box" onSubmit={handleSubmit}>
                        <EmailInput handleBlur={emailFunctions.handleEmailBlur} handleChange={emailFunctions.handleEmailChange} label="Email" isError={email.isEmailError} message={email.EmailMessage} placeholder="Enter Your email"/>
                        <PasswordInput handleChange={passwordFunctions.handlePasswordChange}  label="Password" isError={password.isPasswordError} message={password.PasswordMessage} placeholder="Enter your password"/>
                        <PasswordInput handleBlur={passwordFunctions.handlePasswordConfirmationBlur}  label="Confirm Password" isError={password.isPasswordConfirmationMessage} message={password.PasswordConfirmationMessage} placeholder="confirm your password"/>
                        <label class="checkbox mb-2"><input type="checkbox" required />  I agree to the <a href="#">terms and conditions</a></label>
                        <SubmitButton type="submit" label="Sign Up"/>
                        <SocialMediaButton onClick={SignUpWithGoogle} isGoogle label="Sign Up with Google"/>
                        <SocialMediaButton onClick={SignUpWithFacebook} label="Sign Up with Facebook"/>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </section>



)}
export default SingupFirstStep;