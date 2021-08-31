import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const GetStarted =()=> {
    const { t } = useTranslation();

  	return (
        <section className="section section-lg bg-get-start">
            <div className="bg-overlay"></div>
            <div className="container">
                <div className="columns is-vcentered is-centered">
                    <div className="column is-8-desktop has-text-centered">
                        <h1 className="get-started-title text-white desc-title">{t("get_started_header")}</h1>
                        <div className="section-title-border margin-t-20 bg-white"></div>
                        <div className="is-flex is-justify-content-center">
                            <p className="padding-t-15 pt-4 home-desc">{t("get_started_pragraph")}</p>
                        </div>
                        <Link to="#" className="btn btn-bg-white waves-effect margin-t-20 mb-4">{t("get_started")} <i className="mdi mdi-arrow-right"></i> </Link>
                    </div>
                </div>
            </div>
            <div className="bg-pattern-effect">
                <img src="images/bg-pattern-light.png" alt="" />
            </div>
        </section>
  	);
  
}
export default GetStarted;