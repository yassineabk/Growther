import React from 'react';
import userA from '../../../assets/images/testimonials/user-1.jpg'
import userB from '../../../assets/images/testimonials/user-2.jpg'
import userC from '../../../assets/images/testimonials/user-3.jpg'
import { useTranslation } from "react-i18next";


const Testimonials=() =>{
    const { t } = useTranslation();

  	return (
         <section className="section" id="testimonials">
            <div className="container">
                <div className="columns is-vcentered is-centered">
                    <div className="column is-8-desktop has-text-centered">
                        <h1 className="section-title ">{t("testi_header")}</h1>
                        <div className="section-title-border margin-t-20"></div>
                        <p className="section-subtitle pt-4 text-muted text-center font-secondary service-title padding-t-30">{t("testi_p")}</p>
                    </div>
                </div>
                <div className="columns margin-t-50">
                    <div className="column is-4-desktop">
                        <div className="testimonial-box hover-effect margin-t-30">
                            <img src={userB} alt="" className="img-fluid d-block img-thumbnail rounded-circle" />
                            <div className="testimonial-decs">
                                <p className="text-muted has-text-centered mb-0">{t("first_testi")}</p>
                            </div>
                            <h5 className="has-text-centered text-uppercase pt-3 padding-t-15">{t("first_testi_user")} <span className="text-muted text-capitalize">{t("first_testi_comp")}</span></h5>
                        </div>
                    </div>
                    <div className="column is-4-desktop">
                        <div className="testimonial-box hover-effect margin-t-30">
                            <img src={userA} alt="" className="img-fluid d-block img-thumbnail rounded-circle" />
                            <div className="testimonial-decs">
                                <p className="text-muted has-text-centered mb-0">{t("second_testi")}</p>
                            </div>
                            <h5 className="has-text-centered pt-3 text-uppercase padding-t-15">{t("second_testi_user")}  <span className="text-muted text-capitalize">{t("second_testi_comp")}</span></h5>
                        </div>
                    </div>
                    <div className="column is-4-desktop">
                        <div className="testimonial-box hover-effect margin-t-30">
                            <img src={userC} alt="" className="img-fluid d-block img-thumbnail rounded-circle" />
                            <div className="testimonial-decs">
                                <p className="text-muted has-text-centered mb-0">{t("third_testi")}</p>
                            </div>
                            <h5 className="has-text-centered pt-3 text-uppercase padding-t-15">{t("third_testi_user")}  <span className="text-muted text-capitalize">{t("third_testi_comp")}</span></h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  	);
  
}
export default Testimonials;