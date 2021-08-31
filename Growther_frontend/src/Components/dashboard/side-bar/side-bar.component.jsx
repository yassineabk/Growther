import React, { useEffect } from "react"
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { logout } from "../../../redux/login/login.actions";

export const DashboradSideBar = ({isBrand})=>{
    var homeLocations = [
        "/dashboard", 
    ]
    var templateLocations = [
        "/dashboard/Templates",
        "/dashboard/Templates/new",
    ]
    var history = useHistory()
    var location = useLocation()
    var dispatch = useDispatch()
    var changeHandler = (path)=>{
        //if(path === "/dashboard") return history.push(activePage && typeof(activePage) === "string" ? activePage : path)
        history.push(path)
    }
    var Logout = ()=>{
        logout(dispatch).then(value =>{
            history.push("/landing-page")
        })
    }
    var {direction} = useSelector(state => state.userInfos)
    var {t} = useTranslation()
    useEffect(()=>{
        document.addEventListener("click", event =>{
            var id = event.target.id
            if(id !== "sideBar" && id !== "burgerIcon"){
                var sideBar = document.getElementById("sideBar")
                if(sideBar !== null && typeof(sideBar) === "object"){
                    if(!sideBar.contains(event.target) && sideBar.classList.contains("showSideBar")){
                        sideBar.classList.remove("showSideBar")
                    }
                }
            }
        })
    })
    return(
        <div dir={direction ? direction : "ltr"} id="sideBar" className="sideBar">
            <div className="sideBar_Items is-flex is-flex-direction-column">
                <div onClick={()=> changeHandler("/")} className="is-flex logo-container">
                    <img alt="" src={require("../../../assets/icons/logo.png").default}/>
                </div>
                <div className="screens-buttons is-flex is-flex-direction-column">
                    <div dir={direction ? direction : "ltr"} onClick={()=> changeHandler("/dashboard")} className={homeLocations.includes(location.pathname) ? "sideBar_item active" : "sideBar_item"}>
                        <img alt="" src={require("../../../assets/icons/home.png").default}/>
                        <div dir={direction ? direction : "ltr"} className="tooltip is-flex">
                            <span className="tooltip-text">{t("home")}</span>
                        </div>
                    </div>
                    {isBrand === "true" ? 
                        [
                            <div dir={direction ? direction : "ltr"} onClick={()=>changeHandler("/dashboard/My Contests")} className={location.pathname.includes("/dashboard/My Contests") ? "sideBar_item active" : "sideBar_item"}>
                                <img alt="" src={require("../../../assets/icons/trophy.png").default}/>
                                <div dir={direction ? direction : "ltr"} className="tooltip is-flex">
                                    <span className="tooltip-text">{t("contests")}</span>
                                </div>
                            </div>,
                            <div dir={direction ? direction : "ltr"} onClick={()=>changeHandler("/dashboard/Templates")} className={templateLocations.includes(location.pathname) ? "sideBar_item active" : "sideBar_item"}>
                                <img alt="" src={require("../../../assets/icons/file.png").default}/>
                                <div dir={direction ? direction : "ltr"} className="tooltip is-flex">
                                    <span className="tooltip-text">{t("templates")}</span>
                                </div>
                            </div>,
                            <div dir={direction ? direction : "ltr"} onClick={()=>changeHandler("/dashboard/draft")} className={location.pathname === "/dashboard/draft" ? "sideBar_item active" : "sideBar_item"}>
                                <img alt="" src={require("../../../assets/icons/draft.png").default}/>
                                <div dir={direction ? direction : "ltr"} className="tooltip is-flex">
                                    <span className="tooltip-text">{t("draft")}</span>
                                </div>
                            </div>
                        ] : null}
                </div>
            </div>
            <div className="profile_picture is-flex is-flex-direction-column">
                <div className="tail-buttons is-flex is-flex-direction-column is-justify-content-flex-end">
                    <div className="tailButton" onClick={()=> changeHandler("/dashboard/support")}>
                        <img alt="" src={require("../../../assets/icons/headset.png").default} />
                        <div dir={direction ? direction : "ltr"} className="tooltip is-flex">
                            <span className="tooltip-text">{t("support")}</span>
                        </div>
                    </div>
                    <div className="tailButton" onClick={()=> changeHandler("/dashboard/settings")}>
                        <img alt="" src={require("../../../assets/icons/settings.png").default}/>
                        <div dir={direction ? direction : "ltr"} className="tooltip is-flex">
                            <span className="tooltip-text">{t("settings")}</span>
                        </div>
                    </div>
                    <div className="tailButton">
                        <img onClick={()=>{
                            Logout()
                        }} alt="" src={require("../../../assets/icons/logout.png").default} />
                        <div dir={direction ? direction : "ltr"} className="tooltip is-flex">
                            <span className="tooltip-text">{t("logout")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}