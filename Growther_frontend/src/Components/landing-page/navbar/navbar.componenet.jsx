import React from 'react';
import {Link} from 'react-router-dom'

class Navbar extends React.Component {
    scroll = (id)=>{
        document.getElementById(id).scrollIntoView({behavior: "smooth"})
    }
  render() {
  	return (
        <nav className="navbar pr-6 pt-4 pl-6 is-dark  pb-4" role="navigation" aria-label="main navigation">
            <div className="navbar-brand ">
                <Link  className="navbar-item" to="/">
                    DiD
                </Link >

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu ">
                <div className="navbar-start is-flex is-justify-content-center ">
                    <Link className="navbar-item" to="/">Home</Link >
                    <Link onClick={()=> this.scroll("services")} className="navbar-item" to="#services">Services</Link >
                    <Link onClick={()=> this.scroll("features")} className="navbar-item" to="#features">Features</Link >
                    <Link onClick={()=> this.scroll("pricing")} className="navbar-item" to="#pricing"> Pricing</Link >
                    <Link onClick={()=> this.scroll("testimonials")} className="navbar-item" to="#testimonials">Testimonials</Link >
                    <Link onClick={()=> this.scroll("contact")} className="navbar-item" to="#contact"> Contact</Link >
                </div>
            </div>

            <div className="navbar-end">
                <div className="navbar-item ">
                      
                        <div className="buttons ">
                        <Link to="/signup" className="btn btn-primary center-cta">Learn More <i className="mdi mdi-arrow-right"></i></Link>
                        </div>
                    
                </div>
            </div>
        </nav>
  	);
  }
}

export default Navbar;