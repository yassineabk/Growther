import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

const GetStarted =()=> {
    const { t } = useTranslation();
    var {direction} = useSelector(state => state.userInfos)
  	return (
        <section id={"get-started"} className="section section-lg bg-get-start">
            <div className="bg-overlay"></div>
            <div className="container">
                <div className="columns is-vcentered is-centered">
                    <div className="column is-8-desktop has-text-centered">
                        <h1 dir={direction ? direction : "ltr"} className="get-started-title text-white desc-title">{t("get_started_header")}</h1>
                        <div className="section-title-border margin-t-20 bg-white"></div>
                        <div className="is-flex is-justify-content-center">
                            <p dir={direction ? direction : "ltr"} className="padding-t-15 pt-4 home-desc">{t("get_started_pragraph")}</p>
                        </div>
                        <Link dir={direction ? direction : "ltr"} to="#" className="btn btn-bg-white waves-effect margin-t-20 mb-4">{t("get_started")} <i className={`mdi ${direction === "rtl" ? "mdi-arrow-left" : "mdi-arrow-right"}`}></i> </Link>
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