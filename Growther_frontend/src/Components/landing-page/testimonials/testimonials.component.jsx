import React from 'react';
import userA from '../../../assets/images/testimonials/user-1.jpg'
import userB from '../../../assets/images/testimonials/user-2.jpg'
import userC from '../../../assets/images/testimonials/user-3.jpg'


class Testimonials extends React.Component {
  render() {
  	return (
         <section className="section" id="testi">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <h1 className="section-title text-center">What they've said</h1>
                        <div className="section-title-border margin-t-20"></div>
                        <p className="section-subtitle text-muted text-center font-secondary service-title padding-t-30">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet tortor scelerisque, aliquam leo vel, mattis ex. Phasellus hendrerit nulla eget lectus sodales luctus.</p>
                    </div>
                </div>
                <div className="row margin-t-50">
                    <div className="col-lg-4">
                        <div className="testimonial-box hover-effect margin-t-30">
                            <img src={userB} alt="" className="img-fluid d-block img-thumbnail rounded-circle" />
                            <div className="testimonial-decs">
                                <p className="text-muted text-center mb-0">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet tortor scelerisque, aliquam leo vel, mattis ex. Phasellus hendrerit nulla eget lectus sodales luctus. .” </p>
                            </div>
                            <h5 className="text-center text-uppercase padding-t-15">Jane Doe - <span className="text-muted text-capitalize">JaneX</span></h5>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="testimonial-box hover-effect margin-t-30">
                            <img src={userA} alt="" className="img-fluid d-block img-thumbnail rounded-circle" />
                            <div className="testimonial-decs">
                                <p className="text-muted text-center mb-0">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet tortor scelerisque, aliquam leo vel, mattis ex. Phasellus hendrerit nulla eget lectus sodales luctus.” </p>
                            </div>
                            <h5 className="text-center text-uppercase padding-t-15">John Doe - <span className="text-muted text-capitalize">Electronic Arts</span></h5>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="testimonial-box hover-effect margin-t-30">
                            <img src={userC} alt="" className="img-fluid d-block img-thumbnail rounded-circle" />
                            <div className="testimonial-decs">
                                <p className="text-muted text-center mb-0">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet tortor scelerisque, aliquam leo vel, mattis ex. Phasellus hendrerit nulla eget lectus sodales luctus.” </p>
                            </div>
                            <h5 className="text-center text-uppercase padding-t-15">Jack Doe - <span className="text-muted text-capitalize">Infinity Worlds</span></h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  	);
  }
}
export default Testimonials;