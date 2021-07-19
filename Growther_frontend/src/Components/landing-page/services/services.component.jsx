import React from 'react';

class Services extends React.Component {
  render() {
  	return (
        <section className="section pt-5" id="services">
            <div className="container services-section">
                <div className="row ">
                    <div className="col-lg-8 offset-lg-2">
                        <h1 className="section-title text-center">Our Services</h1>
                        <div className="section-title-border margin-t-20"></div>
                        <p className="section-subtitle text-muted text-center service-title padding-t-30 font-secondary">Build powerful competitions for your business or clients.In order to grow your digital presence</p>
                    </div>
                </div>
                <div className="row margin-t-30">
                    <div className="col-lg-4 margin-t-20">
                        <div className="services-box text-center hover-effect">
                            <i className="pe-7s-gift text-custom"></i>
                            <h4 className="padding-t-15 ">Run Competitions</h4>
                            <p className="padding-t-15 text-muted">Add your prize, choose your actions. Share with your followers,it's as simple as that</p>
                        </div>
                    </div>
                    <div className="col-lg-4 margin-t-20">
                        <div className="services-box text-center hover-effect">
                            <i className="pe-7s-users text-custom"></i>
                            <h4 className="padding-t-15">Get Followers</h4>
                            <p className="padding-t-15 text-muted">Drive more followers, ask users to complete predefined actions to unlock an instant reward.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 margin-t-20">
                        <div className="services-box text-center hover-effect">
                            <i className="pe-7s-graph1 text-custom"></i>
                            <h4 className="padding-t-15">Followers Statistics</h4>
                            <p className="padding-t-15 text-muted">Get statistics about followers and engagements with your competitions.</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
  	);
  }
}
export default Services;