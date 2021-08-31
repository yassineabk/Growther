import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Footer =()=> {
    const { t } = useTranslation();

  	return (
         <footer className="footer-color">
            <div className="container">
                <div className="columns center-newsletter">
                    <div className="column is-3-desktop is-9-mobile is-6-tablet margin-t-20">
                        <h4>{t("subscribe")}</h4>
                        <div className="text-muted margin-t-20">
                            <p>{t("footer_paragraph")}</p>
                        </div>
                        <form className="form subscribe">
                            <input placeholder={t("email_placeholder")} className="form-control" required />
                            <Link to="#" className="submit"><i className="pe-7s-paper-plane"></i></Link>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
  	);
  
}
export default Footer;