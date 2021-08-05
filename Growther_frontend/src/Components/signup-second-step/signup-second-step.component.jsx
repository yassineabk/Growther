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
                        {
                            isBrand ? (
                                <div className="authInput">
                                    <FormInput label="Brand Name" handleBlur={BrandFunctions.handleBrandNameBlur} isError={brand.isError.name} message={brand.errorMessage.name} placeholder="Enter Brand Name"/>
                                    <FormInput label="Brand Url" handleBlur={BrandFunctions.handleBrandUrlBlur} isError={brand.isError.url} message={brand.errorMessage.url} placeholder="Enter Brand Url"/>
                                    <TextAreaInput className="" label="Brand Activities" handleBlur={BrandFunctions.handleBrandActivitiesBlur} isError={brand.isError.activities} message={brand.errorMessage.activities} placeholder="Enter your brand Activities"/>
                                </div>
                            ):(
                                <div className="authInput mb-4">
                                    <FormInput  label="Your Name" isError={individual.isError.name} message={individual.errorMessage.name} handleBlur={IndividualFunctions.handleIndividualNameBlur} placeholder="Enter Your Name"/>
                                </div>
                            )
                        }
                        <SubmitButton id="submitButton" className="" type="submit" label="Next"/>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

)}
export default SingupSecondStep;