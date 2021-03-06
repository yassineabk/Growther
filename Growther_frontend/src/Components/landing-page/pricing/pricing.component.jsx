import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

const Pricing =()=> {
    const { t } = useTranslation();
    var { direction } = useSelector(state => state.userInfos)
  	return (
        <section className="section py-6" id="pricing">
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-8-desktop has-text-centered">
                    <h1 dir={direction ? direction : "ltr"} className="section-title text-center">{t("our_pricing")}</h1>
                    <div className="section-title-border margin-t-20"></div>
                    <p dir={direction ? direction : "ltr"} className="section-subtitle pt-4 font-secondary text-muted text-center service-title padding-t-30">{t("pricing_paragraph")}</p>
                </div>
            </div>
            <div className="columns margin-t-50">
                <div className="column is-4-desktop">
                    <div className="has-text-centered pricing-box hover-effect">
                        <h4 dir={direction ? direction : "ltr"} className="text-uppercase">{t("free")}</h4>
                        <h1 dir={direction ? direction : "ltr"}>$0</h1>
                        <h6 dir={direction ? direction : "ltr"} className="text-uppercase text-muted">{t("billing")}</h6>
                        <div className="pricing-border"></div>
                        <div className="plan-features margin-t-30">
                            <p dir={direction ? direction : "ltr"}><b className="text-custom">5</b> {t("competition")}</p>
                            <p dir={direction ? direction : "ltr"}><b className="text-custom">3 </b> {t("actions")}</p>
                            <p dir={direction ? direction : "ltr"}><b className="text-custom">{t("no")} </b> {t("template")}</p>
                            <p dir={direction ? direction : "ltr"}><b className="text-custom">{t("no")} </b> {t("access")}</p>

                        </div>
                        <Link dir={direction ? direction : "ltr"} to="#" className="btn btn-primary  margin-t-30">{t("join")}</Link>
                    </div>
                </div>
                <div className="column is-4-desktop">
                    <div className="has-text-centered pricing-box bg-white hover-effect price-active">
                        <h4 dir={direction ? direction : "ltr"} className="text-uppercase">{t("free")}</h4>
                        <h1 dir={direction ? direction : "ltr"}>$0</h1>
                        <h6 dir={direction ? direction : "ltr"} className="text-uppercase text-muted">{t("billing")}</h6>
                        <div className="pricing-border"></div>
                        <div className="plan-features margin-t-30">
                            <p dir={direction ? direction : "ltr"}><b className="text-custom">5</b> {t("competition")}</p>
                            <p dir={direction ? direction : "ltr"}><b className="text-custom">3 </b> {t("actions")}</p>
                            <p dir={direction ? direction : "ltr"}><b className="text-custom">{t("no")} </b> {t("template")}</p>
                            <p dir={direction ? direction : "ltr"}><b className="text-custom">{t("no")} </b> {t("access")}</p>

                        </div>
                        <Link dir={direction ? direction : "ltr"} to="#" className="btn btn-primary  margin-t-30">{t("join")}</Link>
                    </div>
                </div>
                <div className="column is-4-desktop">
                    <div className="has-text-centered pricing-box hover-effect">
                        <h4 dir={direction ? direction : "ltr"} className="text-uppercase">{t("free")}</h4>
                        <h1 dir={direction ? direction : "ltr"}>$0</h1>
                        <h6 dir={direction ? direction : "ltr"} className="text-uppercase text-muted">{t("billing")}</h6>
                        <div className="pricing-border"></div>
                        <div className="plan-features margin-t-30">
                            <p dir={direction ? direction : "ltr"}><b className="text-custom">5</b> {t("competition")}</p>
                            <p dir={direction ? direction : "ltr"}><b className="text-custom">3 </b> {t("actions")}</p>
                            <p dir={direction ? direction : "ltr"}><b className="text-custom">{t("no")} </b> {t("template")}</p>
                            <p dir={direction ? direction : "ltr"}><b className="text-custom">{t("no")} </b> {t("access")}</p>

                        </div>
                        <Link dir={direction ? direction : "ltr"} to="#" className="btn btn-primary  margin-t-30">{t("join")}</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  	);
  
}
export default Pricing;