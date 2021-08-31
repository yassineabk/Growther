import React from 'react';
import {Link} from 'react-router-dom'
import { useTranslation } from "react-i18next";

const Navbar =()=> {
    const { t } = useTranslation();

    scroll = (id)=>{
        var element = document.getElementById(id)
        if(element !== null && element !== undefined && typeof(element) === "object"){
            element.scrollIntoView({behavior: "smooth"})
        }
    }
    navbarBurgerClickHandler = ()=>{
        var elements =  [document.getElementById("navbar-burger"), document.getElementById("navbarBasicExample"), document.getElementById("navbar-items")]
        elements.map(element =>{
            if(element !== null && element !== undefined && typeof(element) === "object"){
                element.classList.toggle("is-active")
            }
        })
    }
    componentDidMount(){
        var listener =document.addEventListener("scroll", event=> {
            if(document.getElementById("navbar") !== null && document.getElementById("navbar") !== undefined && typeof(document.getElementById("navbar")) === "object"){
                var Yposition = window.scrollY
                if(Yposition > 80){
                    document.getElementById("navbar").classList.add("is-fixed")
                }else if(Yposition === 0){
                    document.getElementById("navbar").classList.remove("is-fixed")
                }
            }else{
                document.removeEventListener("scroll", listener)
            }
        })
    }
  	return (
        <nav id="navbar" className="navbar pr-6 pt-4 pl-6 is-dark  pb-4" role="navigation" aria-label="main navigation">
            <div className="navbar-brand ">
                <Link className="navbar-item" to="/landing-page">
                    DiD
                </Link >

                <a onClick={()=> this.navbarBurgerClickHandler()} href="#" id="navbar-burger" role="button" className={"navbar-burger"} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu ">
                <div id="navbar-items" className="navbar-start is-flex is-justify-content-center">
                    <Link onClick={()=> this.scroll("home")} className="navbar-item" to="/landing-page">{t("home")}</Link >
                    <Link onClick={()=> this.scroll("services")} className="navbar-item" to="#services">{t("services")}</Link >
                    <Link onClick={()=> this.scroll("features")} className="navbar-item" to="#features">{t("features")}</Link >
                    <Link onClick={()=> this.scroll("pricing")} className="navbar-item" to="#pricing"> {t("pricing")}</Link >
                    <Link onClick={()=> this.scroll("testimonials")} className="navbar-item" to="#testimonials">{t("testimonials")}</Link >
                    <Link onClick={()=> this.scroll("contact")} className="navbar-item" to="#contact"> {t("contact")}</Link >
                </div>
            </div>

            <div className="navbar-end">
                <div className="navbar-item ">
                    <div className="buttons ">
                        <Link id="login" to="/login" style={{color: "white"}} className="mr-3 is-outlined center-cta">{t("login")}</Link>
                        <Link to="/signup" className="btn btn-primary center-cta">{t("signup")} <i className="mdi mdi-arrow-right"></i></Link>
                    </div>
                </div>
            </div>
        </nav>
  	);
  
}

export default Navbar;