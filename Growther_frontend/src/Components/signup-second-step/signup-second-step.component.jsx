import React from 'react'
import EmailInput from '../email-input/email-input.component';
import PasswordInput from '../password-input/password-input.component';
import SubmitButton from '../submit-button/submit-button.component';
import SocialMediaButton from '../social-media-button/social-media-button.component';
import FormInput from '../form-input/form-input.component';
import TextAreaInput from '../text-area-input/text-area-input.component';

const SingupSecondStep=({handleChange,handleSubmit,BrandFunctions,IndividualFunctions,isBrand,individual,brand})=>{
    return(
        <section className="hero is-fullheight Modal">
                <div className="hero-body ">
                    <div className="container ">
                    <div className="columns is-centered ">
                        <div className="column is-5-tablet is-4-desktop is-4-widescreen ">
                        <form action="" className="box" onSubmit={handleSubmit}>
                            <div className="column has-text-centered">
                                <p className="title is-3">Your information</p>
                                <p className="subtitle is6">Let's know you better</p>
                            </div>
                        <label className="label">You are </label>
                        <div className="control pb-4 is-center" onChange={handleChange}>
                                <label className="radio ml-5">
                                    <input className="mr-2" type="radio" name="answer" id="individual"/>
                                    An individual
                                </label>
                                <label className="radio">
                                    <input className="mr-2" type="radio" name="answer" defaultChecked  id="brand"/>
                                    A brand
                                </label>
                        </div>

                        {
                            isBrand ? (
                                <div className="authInput">
                                    <FormInput label="Brand Name" handleBlur={BrandFunctions.handleBrandNameBlur} isError={brand.isNameError} message={brand.nameErrorMessage} placeholder="Enter Brand Name"/>
                                    <FormInput label="Brand Url" handleBlur={BrandFunctions.handleBrandUrlBlur} isError={brand.isUrlError} message={brand.urlErrorMessage} placeholder="Enter Brand Url"/>
                                    <TextAreaInput className="" label="Brand Activities" handleBlur={BrandFunctions.handleBrandActivitiesBlur} isError={brand.isActivitiesError} message={brand.activitiesErrorMessage} placeholder="Enter your brand Activities"/>
                                </div>
                            ):(
                                <div className="authInput mb-4">
                                    <FormInput  label="Your Name" isError={individual.isNameError} message={individual.nameErrorMessage} handleBlur={IndividualFunctions.handleIndividualNameBlur} placeholder="Enter Your Name"/>
                                </div>
                            )
                        }
                        <SubmitButton id="submitButton" className="" type="submit" label="Done"/>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

)}
export default SingupSecondStep;