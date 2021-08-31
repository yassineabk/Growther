import React from 'react';
import { useTranslation } from "react-i18next";

const Services =()=> {
    const { t } = useTranslation();

    return (
        <section className="section py-6" id="services">
            <div className="container is-vcentered">
                <div className="columns  is-centered">
                    <div className="column is-8-desktop">
                        <h1 className="section-title has-text-centered">{t("our_services_p")}</h1>
                        <div className="section-title-border margin-t-20"></div>
                        <p className="section-subtitle pt-4 text-muted has-text-centered service-title padding-t-30 font-secondary">{t("our_services")}</p>
                    </div>
                </div>
                <div className="columns margin-t-30">
                    <div className="is-4-desktop margin-t-20">
                        <div className="services-box has-text-centered hover-effect">
                            <i className="pe-7s-gift text-custom"></i>
                            <h4 className="padding-t-15 ">{t("run_competitions")}</h4>
                            <p className="padding-t-15 text-muted">{t("run_competitions_p")}</p>
                        </div>
                    </div>
                    <div className="is-4-desktop margin-t-20">
                        <div className="services-box has-text-centered hover-effect">
                            <i className="pe-7s-users text-custom"></i>
                            <h4 className="padding-t-15">{t("followers")}</h4>
                            <p className="padding-t-15 text-muted">{t("followers_p")}</p>
                        </div>
                    </div>
                    <div className="is-4-desktop margin-t-20">
                        <div className="services-box has-text-centered hover-effect">
                            <i className="pe-7s-graph1 text-custom"></i>
                            <h4 className="padding-t-15">{t("statistics")}</h4>
                            <p className="padding-t-15 text-muted">{t("statistics_p")}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
  	);
  }

export default Services;