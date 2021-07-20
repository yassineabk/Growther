import React from "react"
import { useHistory, useLocation } from "react-router-dom";

export const DashboradSideBar = ({profilePicture})=>{
    var homeLocations = [
        "/dashboard", 
        "/dashboard/My Contests", 
        "/dashboard/My Contests/new", 
        "/dashboard/Templates",
        "/dashboard/Templates/new",
        "/dashboard/My Contests/new/secondStep",
        "/dashboard/My Contests/new/firstStep",
        "/dashboard/My Contests/new/thirdStep"
    ]
    var history = useHistory()
    var location = useLocation()
    var changeHandler = (path)=>{
        history.push(path)
    }
    return(
        <div className="sideBar is-flex-tablet is-flex-direction-column">
            <div className="sideBar_Items is-flex is-flex-direction-column">
                <div onClick={()=> changeHandler("/")} className="is-flex logo-container">
                    <img alt="" src={require("../../../assets/icons/logo.png").default}/>
                </div>
                <div className="screens-buttons is-flex is-flex-direction-column">
                    <div onClick={()=>changeHandler("/dashboard")} className={homeLocations.includes(location.pathname) ? "sideBar_item active" : "sideBar_item"}>
                        <img alt="" src={require("../../../assets/icons/home.png").default}/>
                    </div>
                    <div onClick={()=>changeHandler("/dashboard/pie")} className={location.pathname === "/dashboard/pie" ? "sideBar_item active" : "sideBar_item"}>
                        <img alt="" src={require("../../../assets/icons/file.png").default}/>
                    </div>
                    <div onClick={()=>changeHandler("/dashboard/trophy")} className={location.pathname === "/dashboard/trophy" ? "sideBar_item active" : "sideBar_item"}>
                        <img alt="" src={require("../../../assets/icons/trophy.png").default}/>
                    </div>
                    <div onClick={()=>changeHandler("/dashboard/settings")} className={location.pathname === "/dashboard/settings" ? "sideBar_item active" : "sideBar_item"}>
                        <img alt="" src={require("../../../assets/icons/settings.png").default}/>
                    </div>
                </div>
            </div>
            <div className="profile_picture is-flex is-flex-direction-column">
                <div className="tail-buttons is-flex is-flex-direction-column is-justify-content-flex-end">
                    <div className="tailButton">
                        <img alt="" src={require("../../../assets/icons/headset.png").default} />
                    </div>
                    <div className="tailButton">
                        <img alt="" src={require("../../../assets/icons/logout.png").default} />
                    </div>
                </div>
            </div>
        </div>
    )
}