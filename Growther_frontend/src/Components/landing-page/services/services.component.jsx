import React from 'react';

class Services extends React.Component {
  render() {
  	return (
        <section className="section py-6" id="services">
            <div className="container is-vcentered">
                <div className="columns  is-centered">
                    <div className="column is-8-desktop">
                        <h1 className="section-title has-text-centered">Our Services</h1>
                        <div className="section-title-border margin-t-20"></div>
                        <p className="section-subtitle pt-4 text-muted has-text-centered service-title padding-t-30 font-secondary">Build powerful competitions for your business or clients.In order to grow your digital presence</p>
                    </div>
                </div>
                <div className="columns margin-t-30">
                    <div className="is-4-desktop margin-t-20">
                        <div className="services-box has-text-centered hover-effect">
                            <i className="pe-7s-gift text-custom"></i>
                            <h4 className="padding-t-15 ">Run Competitions</h4>
                            <p className="padding-t-15 text-muted">Add your prize, choose your actions. Share with your followers,it's as simple as that</p>
                        </div>
                    </div>
                    <div className="is-4-desktop margin-t-20">
                        <div className="services-box has-text-centered hover-effect">
                            <i className="pe-7s-users text-custom"></i>
                            <h4 className="padding-t-15">Get Followers</h4>
                            <p className="padding-t-15 text-muted">Drive more followers, ask users to complete predefined actions to unlock an instant reward.</p>
                        </div>
                    </div>
                    <div className="is-4-desktop margin-t-20">
                        <div className="services-box has-text-centered hover-effect">
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