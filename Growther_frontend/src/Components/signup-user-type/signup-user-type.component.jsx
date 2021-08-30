import React from "react"
import SubmitButton from "../submit-button/submit-button.component"
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const SignupUserType = ({handleSubmit, handleClick,isBrand})=>{
    const history = useHistory();
    const { t } = useTranslation();
  function handleClickLogin() {
    history.push("/login");
  }
    return(
        <section className="hero is-fullheight Modal">
            <div className="hero-body ">
                <div className="container ">
                    <div className="columns is-centered ">
                        <div className="column is-5-tablet is-4-desktop is-4-widescreen ">
                            <form action="" className="box" onSubmit={handleSubmit}>
                                <div className="column has-text-centered">
                                    <p className="title is-3">{t("cretae_account")}</p>
                                    {/*<p className="subtitle is-6">P</p>*/}
                                </div>
                                <div className="control pb-4 is-center is-flex userTypeContainer" >
                                    <div className="is-flex is-flex-direction-column">
                                        <div className={`${isBrand ? '' :'isSelected'} typeIcon`} onClick={handleClick}>
                                            <img alt="" name="individual" src={require("../../assets/icons/individual.png").default} />
                                        </div>
                                        <div>{t("individual")}</div>
                                    </div>
                                    <div className="is-flex is-flex-direction-column">
                                        <div className={`${isBrand ? 'isSelected' :''} typeIcon`}  onClick={handleClick}>
                                            <img alt="" name="brand" src={require("../../assets/icons/brand.png").default} />
                                        </div>
                                        <div>{t("brand")}</div>
                                    </div>
                                </div>
                                <SubmitButton className="details-button" type="submit" label={t("next")}/>
                                <SubmitButton onClick={handleClickLogin} className="duplicate-button" type="button" label={t("login")}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}