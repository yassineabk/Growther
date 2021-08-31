import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

const Footer =()=> {
    const { t } = useTranslation();
    var {direction} = useSelector(state => state.userInfos)
  	return (
         <footer className="footer-color">
            <div className="container">
                <div className="columns center-newsletter">
                    <div className="column is-3-desktop is-9-mobile is-6-tablet margin-t-20">
                        <h4 dir={direction ? direction : "ltr"}>{t("subscribe")}</h4>
                        <div className="text-muted margin-t-20">
                            <p dir={direction ? direction : "ltr"}>{t("footer_paragraph")}</p>
                        </div>
                        <form className="form subscribe">
                            <input dir={direction ? direction : "ltr"} placeholder={t("email_placeholder")} className="form-control" required />
                            <Link dir={direction ? direction : "ltr"} to="#" className="submit"><i className="pe-7s-paper-plane"></i></Link>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
  	);
  
}
export default Footer;