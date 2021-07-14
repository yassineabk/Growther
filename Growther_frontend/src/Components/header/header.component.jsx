import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectCurrentUser} from '../../redux/user/user.selectors'



const Header=({currentUser})=>{
    
    return(

        <nav className="navbar pr-6 pt-4 pl-6" role="navigation" aria-label="main navigation">
            <div className="navbar-brand ">
                <Link  className="navbar-item" to="/">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
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
                <div className="navbar-item">
                    {
                        currentUser ? (
                        <div className="buttons">
                            <Link className="button" to=""><strong>Sign out</strong></Link>
                        </div>
                        ):(
                        <div className="buttons">
                            <Link className="button is-primary" to="/signup"><strong>Sign up</strong></Link>
                            <Link className="button is-light" to="/login"> Log in</Link>
                        </div>
                        )
                    }
                    
                </div>
            </div>
        </nav>
        
)}

const mapStateToProps=createStructuredSelector({
    currentUser:selectCurrentUser,
})

export default connect(mapStateToProps)(Header);

