import React from 'react';
import { Link } from 'react-router-dom';

const SocialMedia =()=> {

  	return (
        <section className="cta bg-light">
            <div className="container">
                <div className="columns">
                    <div className="column is-6-desktop has-text-centered-mobile">
                        <ul className="list-inline social margin-t-20">
                            <li className="list-inline-item"> <Link to="#" className="social-icon"><i className="mdi mdi-facebook"></i></Link></li>
                            <li className="list-inline-item"> <Link to="#" className="social-icon"><i className="mdi mdi-twitter"></i></Link></li>
                            <li className="list-inline-item"> <Link to="#" className="social-icon"><i className="mdi mdi-linkedin"></i></Link></li>
                            <li className="list-inline-item"> <Link to="#" className="social-icon"><i className="mdi mdi-google-plus"></i></Link></li>
                        </ul>
                    </div>
                    <div className="column is-3-desktop has-text-centered-mobile margin-t-30">
                        <p className="margin-b-0 contact-title"><i className="pe-7s-call"></i> &nbsp;+91 123 4556 789</p>
                    </div>
                    <div className="column is-3-desktop has-text-centered-mobile margin-t-30 has-text-right">
                        <p className="contact-title"><i className="pe-7s-mail-open"></i>&nbsp; Support@info.com</p>
                    </div>
                </div>
            </div>
        </section>
  	);
  }

export default SocialMedia;