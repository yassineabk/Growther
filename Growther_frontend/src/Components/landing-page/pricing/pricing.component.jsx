import React from 'react';
import { Link } from 'react-router-dom';

class Pricing extends React.Component {
  render() {
  	return (
        <section className="section pt-5" id="pricing">
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-8-desktop has-text-centered">
                    <h1 className="section-title text-center">Our Pricing</h1>
                    <div className="section-title-border margin-t-20"></div>
                    <p className="section-subtitle font-secondary text-muted text-center service-title padding-t-30">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet tortor scelerisque,.</p>
                </div>
            </div>
            <div className="columns margin-t-50">
                <div className="column is-4-desktop">
                    <div className="has-text-centered pricing-box hover-effect">
                        <h4 className="text-uppercase">Free</h4>
                        <h1>$0</h1>
                        <h6 className="text-uppercase text-muted">Billing Per Month</h6>
                        <div className="pricing-border"></div>
                        <div className="plan-features margin-t-30">
                            <p><b className="text-custom">5</b> competitions per mounth</p>
                            <p><b className="text-custom">3 </b> actions per competition</p>
                            <p><b className="text-custom">No </b> templates avalaible</p>
                            <p><b className="text-custom">No </b> access to maillist</p>

                        </div>
                        <Link to="JavaScript:Void(0);" className="btn btn-primary  margin-t-30">Join Now</Link>
                    </div>
                </div>
                <div className="column is-4-desktop">
                    <div className="has-text-centered pricing-box bg-white hover-effect price-active">
                        <h4 className="text-uppercase">Standard</h4>
                        <h1>$19.90</h1>
                        <h6 className="text-uppercase text-muted">Billing Per Month</h6>
                        <div className="pricing-border"></div>
                        <div className="plan-features margin-t-30">
                            <p><b className="text-custom">10</b> competitions per mounth</p>
                            <p><b className="text-custom">6 </b> actions per competition</p>
                            <p><b className="text-custom">Standard </b> templates avalaible</p>
                            <p><b className="text-custom">No </b> access to maillist</p>
                        </div>
                        <Link to="JavaScript:Void(0);" className="btn btn-primary  margin-t-30">Join Now</Link>
                    </div>
                </div>
                <div className="column is-4-desktop">
                    <div className="has-text-centered pricing-box hover-effect">
                        <h4 className="text-uppercase">Premium</h4>
                        <h1>$29.90</h1>
                        <h6 className="text-uppercase text-muted">Billing Per Month</h6>
                        <div className="pricing-border"></div>
                        <div className="plan-features margin-t-30">
                            <p><b className="text-custom">unlimited</b> competitions per mounth</p>
                             <p><b className="text-custom">unlimited </b> actions per competition</p>
                            <p><b className="text-custom">unlimited </b> templates avalaible</p>
                            <p><b className="text-custom ">access</b>  to maillist</p>
                        </div>
                        <Link to="JavaScript:Void(0);" className="btn btn-primary  margin-t-30">Join Now</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  	);
  }
}
export default Pricing;