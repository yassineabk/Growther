import React, { useEffect } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { DashboardContestPage } from "../../contest/contests-page/contests-page.component"
import { DashboardHomePage } from "../home-page/home-page.component"
import { NewContest } from "../../contest/new-contest/new-contest.component"
import { DashboardTemplatesPage } from "../templates-page/templates-page.component"
import { EditContest } from "../../contest/edit-contest/edit-contest.component"
import { useDispatch, useSelector } from "react-redux"
import { DashboardGetData } from "../../../redux/dashboard/dashboard-actions"
export const DashboardBody = ({templates, todo, recent, brandname, child}) =>{
    var showSideBar = ()=>{
        document.getElementById("sideBar").classList.toggle("showSideBar")
    }
    return(
        <div className="columns is-multiline is-variable is-1-tablet is-2-desktop dashboard_Body">
            <div className="column is-full big_title is-flex is-flex-direction-row">
                <div>Dashboard</div>
                <div onClick={()=> showSideBar()} className="burgerIcon">
                    <img src={require("../../../assets/icons/burger.png").default} />
                </div>
            </div>
            {child ? child : null}
                {/*<Route exact path='/dashboard' render={()=> (
                    <DashboardHomePage 
                        contests={Array.isArray(contests) ? contests.slice(0,3) : contests} 
                        templates={templates} 
                        todo={todo} 
                        recent={recent} 
                        brandname={brandname}
                    />)} 
                />*/}
                
               
        </div>
    )
}