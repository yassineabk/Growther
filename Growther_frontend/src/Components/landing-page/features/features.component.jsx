import React from 'react';
import { Link } from 'react-router-dom';
import FeatureImage from '../../../assets/images/online-world.svg';

class Features extends React.Component {
  render() {
  	return (
        <section className="section bg-light" id="features">
        <div className="container">
            <div className="columns  is-multiline">
                <div className="column is-7-desktop is-6-tablet is-centered">
                    <div className="features-box has-text-centered-mobile">
                        <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
                        <p className="text-muted ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet tortor scelerisque, aliquam leo vel, mattis ex. Phasellus hendrerit nulla eget lectus sodales luctus. Nullam at tristique erat, eget dapibus nunc. Mauris velit lectus, aliquet ac leo id, pharetra ornare sem..</p>
                        <ul className="text-muted list-unstyled margin-t-30 features-item-list">
                            <li className="">Lorem ipsum dolor sit amet.</li>
                            <li className="">Lorem ipsum dolor sit amet.</li>
                            <li className="">Lorem ipsum dolor sit amet.</li>
                            <li className="">Lorem ipsum dolor sit amet.</li>
                        </ul>
                        <Link to="JavaScript:Void(0);" className="btn btn-primary mt-4 margin-t-30">Learn More <i className="mdi mdi-arrow-right"></i></Link>
                    </div>
                </div>
                <div className="column is-5-desktop is-6-tablet is-centered">
                    <div className="features-img features-right text-right">
                    <img src={FeatureImage} alt=""  className="feature-img-fluid"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
  	);
  }
}
export default Features;