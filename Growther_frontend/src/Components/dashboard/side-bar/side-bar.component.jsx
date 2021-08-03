import React from "react"
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { logout } from "../../../redux/login/login.actions";

export const DashboradSideBar = ({activePage})=>{
    var {activePage} = useSelector(state => state.contest)
    var homeLocations = [
        "/dashboard", 
    ]
    var contestLocations = [
        "/dashboard/My Contests", 
        "/dashboard/My Contests/new", 
        "/dashboard/My Contests/new/secondStep",
        "/dashboard/My Contests/new/firstStep",
        "/dashboard/My Contests/new/thirdStep",
        "/dashboard/My Contests/"
    ]
    var templateLocations = [
        "/dashboard/Templates",
        "/dashboard/Templates/new",
    ]
    var history = useHistory()
    var location = useLocation()
    var changeHandler = (path)=>{
        //if(path === "/dashboard") return history.push(activePage && typeof(activePage) === "string" ? activePage : path)
        history.push(path)
    }
    var Logout = ()=>{
        logout().then(value =>{
            history.push("/landing-page")
        })
    }
    return(
        <div id="sideBar" className="sideBar">
            <div className="sideBar_Items is-flex is-flex-direction-column">
                <div onClick={()=> changeHandler("/")} className="is-flex logo-container">
                    <img alt="" src={require("../../../assets/icons/logo.png").default}/>
                </div>
                <div className="screens-buttons is-flex is-flex-direction-column">
                    <div onClick={()=> changeHandler("/dashboard")} className={homeLocations.includes(location.pathname) ? "sideBar_item active" : "sideBar_item"}>
                        <img alt="" src={require("../../../assets/icons/home.png").default}/>
                    </div>
                    <div onClick={()=>changeHandler("/dashboard/My Contests")} className={location.pathname.includes("/dashboard/My Contests") ? "sideBar_item active" : "sideBar_item"}>
                        <img alt="" src={require("../../../assets/icons/trophy.png").default}/>
                    </div>
                    <div onClick={()=>changeHandler("/dashboard/Templates")} className={templateLocations.includes(location.pathname) ? "sideBar_item active" : "sideBar_item"}>
                        <img alt="" src={require("../../../assets/icons/file.png").default}/>
                    </div>
                    <div onClick={()=>changeHandler("/dashboard/draft")} className={location.pathname === "/dashboard/draft" ? "sideBar_item active" : "sideBar_item"}>
                        <img alt="" src={require("../../../assets/icons/draft.png").default}/>
                    </div>
                </div>
            </div>
            <div className="profile_picture is-flex is-flex-direction-column">
                <div className="tail-buttons is-flex is-flex-direction-column is-justify-content-flex-end">
                    <div className="tailButton">
                        <img alt="" src={require("../../../assets/icons/headset.png").default} />
                    </div>
                    <div className="tailButton" onClick={()=>changeHandler("/dashboard/settings")} className={location.pathname === "/dashboard/settings" ? "sideBar_item active" : "sideBar_item"}>
                        <img alt="" src={require("../../../assets/icons/settings.png").default}/>
                    </div>
                    <div className="tailButton">
                        <img onClick={()=>{
                            Logout()
                        }} alt="" src={require("../../../assets/icons/logout.png").default} />
                    </div>
                </div>
            </div>
        </div>
    )
}