import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Descriptions =()=> {
    const { t } = useTranslation();

  	return (
          <section className="section py-6 section-lg bg-web-desc">
            <div className="bg-overlay"></div>
            <div className="container">
                <div className="columns ">
                    <div className="column is-flex is-flex-direction-column is-align-items-center is-12-desktop has-text-centered">
                        <h2 className="text-white desc-title">{t("decription_header")}</h2>
                        <div className="is-flex is-justify-content-center">
                            <p className="padding-t-15 pt-4 home-desc">{t("description_paragraph")}</p>
                        </div>
                        <Link to="#" className="btn btn-bg-white margin-t-30 mb-5">{t('plan_pricing')}</Link>
                    </div>
                </div>
            </div>
            <div className="bg-pattern-effect">
            </div>
        </section>
  	);
  
}
export default Descriptions;