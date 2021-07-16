import React from 'react';
import Navbar from '../../Components/landing-page/navbar/navbar.componenet';
import Services from '../../Components/landing-page/services/services.component';
import Features from '../../Components/landing-page/features/features.component';
import Descriptions from '../../Components/landing-page/descriptions/descriptions.component';
import Pricing from '../../Components/landing-page/pricing/pricing.component';
import Testimonials from '../../Components/landing-page/testimonials/testimonials.component';
import GetStarted from '../../Components/landing-page/get-started/get-started.component';
import Contact from '../../Components/landing-page/contact/contact.componenet';
import SocialMedia from '../../Components/landing-page/social-media/social-media.component';
import Footer from '../../Components/landing-page/footer/footer.component';
import Auxi from '../../Components/landing-page/hoc/auxi.componenet';

class LandingPage extends React.Component {
  render() {

    var bkg1 = {
        backgroundImage: 'url(images/img-2.jpg)',
        backgroundSize : 'cover',
        backgroundPosition : 'center',
      };
 
  	return (
        <Auxi>
                {/* Navbar Component*/}
                
                <section className="section section-lg home-half" id="home" style={bkg1} >
                   <div className="bg-overlay"></div>
                       <div className="display-table">
                           <div className="home-cell-bottom">
                               <div className="container">
                                   <div className="row">
                                      <div className="col-lg-8 offset-lg-2 text-white text-center">
                                        <h1 className="home-title">We help brands grow their audience</h1>
                                        <p className="padding-t-15 home-desc">Etiam sed.Interdum consequat proin vestibulum className at a euismod mus luctus quam.Lorem ipsum dolor sit amet, consectetur adipisicing eli.</p>
                                        <div className="margin-t-30">
                                            <iframe src="http://player.vimeo.com/video/69988283?color=f15b72&amp;title=0&amp;byline=0&amp;portrait=0" width="555" height="321" className="frame-border"></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Component*/}
                <Services />

                {/* Features Component*/}
                <Features />
                
                {/* Descriptions Component*/}
                <Descriptions />

                {/* Pricing Component*/}
                <Pricing />

                {/* Testi Component*/}
                <Testimonials />

                {/* Started Component*/}
                <GetStarted />


                {/* Contact Component*/}
                <Contact />

                {/* SocialMedia Component*/}
                <SocialMedia />
                
                {/* Footer Component*/}
                <Footer />

        </Auxi>
  	);
  }
}

export default LandingPage;