import React from 'react';
import { Link } from 'react-router-dom';

class GetStarted extends React.Component {
  render() {
  	return (
        <section className="section section-lg bg-get-start">
            <div className="bg-overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2 text-center">
                        <h1 className="get-started-title text-white desc-title">Let's Get Started</h1>
                        <div className="section-title-border margin-t-20 bg-white"></div>
                        <p className="section-subtitle font-secondary text-white text-center service-title padding-t-30">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet tortor scelerisque, aliquam leo vel, mattis ex. Phasellus hendrerit nulla eget lectus sodales luctus. </p>
                        <Link to="JavaScript:Void(0);" className="btn btn-bg-white waves-effect margin-t-20 mb-4">Get Started <i className="mdi mdi-arrow-right"></i> </Link>
                    </div>
                </div>
            </div>
            <div className="bg-pattern-effect">
                <img src="images/bg-pattern-light.png" alt="" />
            </div>
        </section>
  	);
  }
}
export default GetStarted;