import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  render() {
  	return (
         <footer className="footer-color">
            <div className="container">
                <div className="columns center-newsletter">
                    <div className="column is-3-desktop is-9-mobile is-6-tablet margin-t-20">
                        <h4>Subscribe</h4>
                        <div className="text-muted margin-t-20">
                            <p>In an ideal world this text wouldn’t exist, a client would acknowledge the importance of having web copy before the design starts.</p>
                        </div>
                        <form className="form subscribe">
                            <input placeholder="Email" className="form-control" required />
                            <Link to="JavaScript:Void(0);" className="submit"><i className="pe-7s-paper-plane"></i></Link>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
  	);
  }
}
export default Footer;