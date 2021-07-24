import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'



const Header=({currentUser})=>{
    var location = useLocation()
    var paths = ["/signup", "/login", "/", "/home","/landing-page"]
    if(!paths.includes(location.pathname)) return null
    return(

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
                    <Link  className="navbar-item" to="/">Home</Link >
                    <Link  className="navbar-item" to="/"> Why Us</Link >
                    <Link  className="navbar-item" to="/">Testomonials</Link >
                    <Link  className="navbar-item" to="/"> Pricing</Link >
                    <Link  className="navbar-item" to="/">FAQ</Link >
                    <Link  className="navbar-item" to="/"> Contact US</Link >
                </div>
            </div>

            <div className="navbar-end">
                <div className="navbar-item ">
                    {
                        currentUser ? (
                        <div className="buttons">
                            <Link className="button" to=""><strong>Sign out</strong></Link>
                        </div>
                        ):(
                        <div className="buttons ">
                        <Link to="JavaScript:Void(0);" className="btn btn-primary center-cta">Learn More <i className="mdi mdi-arrow-right"></i></Link>
                        </div>
                        )
                    }
                    
                </div>
            </div>
        </nav>
        
)}

function mapStateToProps(state) {
    const { auth } = state
    return {currentUser : auth.currentUser}
}
export default connect(mapStateToProps)(Header);

