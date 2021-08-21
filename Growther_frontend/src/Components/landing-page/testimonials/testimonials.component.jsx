import React from 'react';
import userA from '../../../assets/images/testimonials/user-1.jpg'
import userB from '../../../assets/images/testimonials/user-2.jpg'
import userC from '../../../assets/images/testimonials/user-3.jpg'


class Testimonials extends React.Component {
  render() {
  	return (
         <section className="section" id="testimonials">
            <div className="container">
                <div className="columns is-vcentered is-centered">
                    <div className="column is-8-desktop has-text-centered">
                        <h1 className="section-title ">What they've said</h1>
                        <div className="section-title-border margin-t-20"></div>
                        <p className="section-subtitle pt-4 text-muted text-center font-secondary service-title padding-t-30">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet tortor scelerisque, aliquam leo vel, mattis ex. Phasellus hendrerit nulla eget lectus sodales luctus.</p>
                    </div>
                </div>
                <div className="columns margin-t-50">
                    <div className="column is-4-desktop">
                        <div className="testimonial-box hover-effect margin-t-30">
                            <img src={userB} alt="" className="img-fluid d-block img-thumbnail rounded-circle" />
                            <div className="testimonial-decs">
                                <p className="text-muted has-text-centered mb-0">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet tortor scelerisque, aliquam leo vel, mattis ex. Phasellus hendrerit nulla eget lectus sodales luctus. .” </p>
                            </div>
                            <h5 className="has-text-centered text-uppercase pt-3 padding-t-15">Jane Doe - <span className="text-muted text-capitalize">JaneX</span></h5>
                        </div>
                    </div>
                    <div className="column is-4-desktop">
                        <div className="testimonial-box hover-effect margin-t-30">
                            <img src={userA} alt="" className="img-fluid d-block img-thumbnail rounded-circle" />
                            <div className="testimonial-decs">
                                <p className="text-muted has-text-centered mb-0">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet tortor scelerisque, aliquam leo vel, mattis ex. Phasellus hendrerit nulla eget lectus sodales luctus.” </p>
                            </div>
                            <h5 className="has-text-centered pt-3 text-uppercase padding-t-15">John Doe - <span className="text-muted text-capitalize">Electronic Arts</span></h5>
                        </div>
                    </div>
                    <div className="column is-4-desktop">
                        <div className="testimonial-box hover-effect margin-t-30">
                            <img src={userC} alt="" className="img-fluid d-block img-thumbnail rounded-circle" />
                            <div className="testimonial-decs">
                                <p className="text-muted has-text-centered mb-0">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet tortor scelerisque, aliquam leo vel, mattis ex. Phasellus hendrerit nulla eget lectus sodales luctus.” </p>
                            </div>
                            <h5 className="has-text-centered pt-3 text-uppercase padding-t-15">Jack Doe - <span className="text-muted text-capitalize">Infinity Worlds</span></h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  	);
  }
}
export default Testimonials;