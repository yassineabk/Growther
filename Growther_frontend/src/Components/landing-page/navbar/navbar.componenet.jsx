import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

const Navbar =()=> {
    const { t } = useTranslation();
    var {direction} = useSelector(state => state.userInfos)
    var scroll = (id)=>{
        var element = document.getElementById(id)
        if(element !== null && element !== undefined && typeof(element) === "object"){
            element.scrollIntoView({behavior: "smooth"})
        }
    }
    var navbarBurgerClickHandler = ()=>{
        var elements =  [document.getElementById("navbar-burger"), document.getElementById("navbarBasicExample"), document.getElementById("navbar-items")]
        elements.map(element =>{
            if(element !== null && element !== undefined && typeof(element) === "object"){
                element.classList.toggle("is-active")
            }
        })
    }
    useEffect(()=>{
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
    })
  	return (
        <nav id="navbar" dir={direction ? direction : "ltr"} className="navbar pr-6 pt-4 pl-6 is-dark  pb-4" role="navigation" aria-label="main navigation">
            <div className="navbar-brand ">
                <Link className="navbar-item" to="/landing-page">
                    DiD
                </Link >

                <a dir={direction ? direction : "ltr"} onClick={()=> navbarBurgerClickHandler()} href="#" id="navbar-burger" role="button" className={"navbar-burger"} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div dir={direction ? direction : "ltr"} id="navbarBasicExample" className="navbar-menu ">
                <div dir={direction ? direction : "ltr"} id="navbar-items" className="navbar-start is-flex">
                    <Link onClick={()=> scroll("home")} className="navbar-item" to="/landing-page">{t("home")}</Link >
                    <Link onClick={()=> scroll("services")} className="navbar-item" to="#services">{t("services")}</Link >
                    <Link onClick={()=> scroll("features")} className="navbar-item" to="#features">{t("features")}</Link >
                    <Link onClick={()=> scroll("pricing")} className="navbar-item" to="#pricing"> {t("pricing")}</Link >
                    <Link onClick={()=> scroll("testimonials")} className="navbar-item" to="#testimonials">{t("testimonials")}</Link >
                    <Link onClick={()=> scroll("contact")} className="navbar-item" to="#contact"> {t("contact")}</Link >
                </div>
            </div>

            <div className="navbar-end">
                <div className="navbar-item ">
                    <div className="buttons ">
                        <Link id="login" to="/login" style={{color: "white"}} className={`${direction === "rtl" ? "ml-1" : "mr-1"} is-outlined center-cta`}>{t("login")}</Link>
                        <Link to="/signup" className="btn btn-primary center-cta">{t("signup")} <i dir={direction ? direction : "ltr"} id="navbar-arrow" className={`mdi ${direction === "rtl" ? "mdi-arrow-left" : "mdi-arrow-right"}`}></i></Link>
                    </div>
                </div>
            </div>
        </nav>
  	);
  
}

export default Navbar;