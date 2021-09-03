import React from 'react'
import SubmitButton from '../submit-button/submit-button.component';
import FormInput from '../form-input/form-input.component';
import TextAreaInput from '../text-area-input/text-area-input.component';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

const SingupSecondStep=({handleChange,handleSubmit,BrandFunctions,IndividualFunctions,isBrand,individual,brand})=>{
    const { t } = useTranslation();
    var {direction} = useSelector(state => state.userInfos)
    return(
        <section className="hero is-fullheight Modal">
            <div className="hero-body ">
                <div className="container ">
                <div className="columns is-centered ">
                    <div className="column is-5-tablet is-4-desktop is-4-widescreen ">
                        <form action="" className="box" onSubmit={handleSubmit}>
                            <div id="auth-title" className="column has-text-centered">
                                <p dir={direction ? direction : "ltr"} className="title is-3">{t("your_informations")}</p>
                                <p dir={direction ? direction : "ltr"} className="subtitle is-6">{t("info_subheader")}</p>
                            </div>
                            {
                                isBrand ? (
                                    <div className="authInput">
                                        <FormInput label={"brand_name"} handleBlur={BrandFunctions.handleBrandNameBlur} isError={brand.isError.name} message={t(brand.errorMessage.name)} placeholder={t("brand_name_placeholder")}/>
                                        <FormInput label={"brand_url"} handleBlur={BrandFunctions.handleBrandUrlBlur} isError={brand.isError.url} message={brand.errorMessage.url} placeholder={t("brand_url_placeholder")}/>
                                        <TextAreaInput className="" label={t("brand_Activities")} handleBlur={BrandFunctions.handleBrandActivitiesBlur} isError={brand.isError.activities} message={brand.errorMessage.activities} placeholder={t("brand_Activities_placeholder")}/>
                                    </div>
                                ):(
                                    <div className="authInput mb-4">
                                        <FormInput label={"your_name"} isError={individual.isError.name} message={individual.errorMessage.name} handleBlur={IndividualFunctions.handleIndividualNameBlur} placeholder={t("your_name_placeholder")}/>
                                    </div>
                                )
                            }
                            <SubmitButton id="submitButton" className="" type="submit" label={"next"}/>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}
export default SingupSecondStep;