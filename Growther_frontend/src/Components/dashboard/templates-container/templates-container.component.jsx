import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
export const TemplatesContainer = ()=>{
    var {t} = useTranslation()
    var {direction} = useSelector(state => state.userInfos)
    return(
        <div className="is-flex is-flex-direction-column list-container">
            <div className="list-title-container is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                <span className="list-title">
                    {t("templates")}
                </span>
            </div>
            <div className="columns is-multiline is-flex is-flex-direction-row cards">
                <div className="card column is-flex">
                    <div dir={direction ? direction : "ltr"} className="templateImg left-side is-flex">
                        <img alt="" src={require("../../../assets/icons/email.png").default} />
                    </div>
                    <div className="right-side">
                        <div className="card-infos is-flex is-flex-direction-column">
                            <div dir={direction ? direction : "ltr"} className="card-title">
                                <h3>{t("email_signup")}</h3>
                            </div>
                            <div dir={direction ? direction : "ltr"} className="card-description">
                                <p>{t("email_signup_text")}</p>
                            </div>
                        </div>
                        <div className="card-buttons is-flex is-flex-direction-row">
                            <div dir={direction ? direction : "ltr"} className="details-button">{t("preview")}</div>
                            <div dir={direction ? direction : "ltr"} className="duplicate-button">{t("copy")}</div>
                        </div>
                    </div>
                </div>
                <div className="card column is-flex">
                    <div dir={direction ? direction : "ltr"} className="templateImg left-side is-flex">
                        <img alt="" src={require("../../../assets/icons/friends.png").default} />
                    </div>
                    <div className="right-side">
                        <div className="card-infos is-flex is-flex-direction-column">
                            <div dir={direction ? direction : "ltr"} className="card-title">
                                <h3>{t("refer_a_friend")}</h3>
                            </div>
                            <div dir={direction ? direction : "ltr"} dir={direction ? direction : "ltr"} className="card-description">
                                <p>{t("refer_a_friend_text")}</p>
                            </div>
                        </div>
                        <div className="card-buttons is-flex is-flex-direction-row">
                            <div dir={direction ? direction : "ltr"} className="details-button">{t("preview")}</div>
                            <div dir={direction ? direction : "ltr"} className="duplicate-button">{t("copy")}</div>
                        </div>
                    </div>
                </div>
                <div className="card column is-flex">
                    <div dir={direction ? direction : "ltr"} className="templateImg left-side is-flex">
                        <img alt="" src={require("../../../assets/icons/google-play.png").default} />
                    </div>
                    <div className="right-side">
                        <div className="card-infos is-flex is-flex-direction-column">
                            <div dir={direction ? direction : "ltr"} className="card-title">
                                <h3>{t("app_download")}</h3>
                            </div>
                            <div dir={direction ? direction : "ltr"} className="card-description">
                                <p>{t("app_download_text")}</p>
                            </div>
                        </div>
                        <div className="card-buttons is-flex is-flex-direction-row">
                            <div dir={direction ? direction : "ltr"} className="details-button">{t("preview")}</div>
                            <div dir={direction ? direction : "ltr"} className="duplicate-button">{t("copy")}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}