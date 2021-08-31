import React from 'react';
import { Link } from 'react-router-dom';
import FeatureImage from '../../../assets/images/online-world.svg';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

const Features =()=> {
    const { t } = useTranslation();
    var { direction } = useSelector(state => state.userInfos)
  	return (
        <section className="section bg-light" id="features">
        <div className="container">
            <div className="columns  is-multiline">
                <div className="column is-7-desktop is-6-tablet is-centered">
                    <div className="features-box has-text-centered-mobile">
                        <h3 dir={direction ? direction : "ltr"}>{t("feature_header")}</h3>
                        <p dir={direction ? direction : "ltr"} className="text-muted ">{t("feature_paragraph")}</p>
                        <ul dir={direction ? direction : "ltr"} className="text-muted list-unstyled margin-t-30 features-item-list">
                            <li className="">{t("feature_list_item_1")}</li>
                            <li className="">{t("feature_list_item_2")}</li>
                            <li className="">{t("feature_list_item_3")}</li>
                            <li className="">{t("feature_list_item_4")}</li>
                        </ul>
                        <Link dir={direction ? direction : "ltr"} to="#" className="btn btn-primary mt-4 margin-t-30">{t("learn_more")}<i className={`mdi ${direction === "rtl" ? "mdi-arrow-left" : "mdi-arrow-right"}`}></i></Link>
                    </div>
                </div>
                <div className="column is-5-desktop is-6-tablet is-centered">
                    <div className="features-img features-right text-right">
                        <img src={FeatureImage} alt="" className="feature-img-fluid"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
  	);
  }

export default Features;