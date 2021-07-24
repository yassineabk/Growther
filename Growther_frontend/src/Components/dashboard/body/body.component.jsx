import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { DashboardContestPage } from "../../contest/contests-page/contests-page.component"
import { DashboardHomePage } from "../home-page/home-page.component"
import { NewContest } from "../../contest/new-contest/new-contest.component"
import { DashboardTemplatesPage } from "../templates-page/templates-page.component"
import { SignupUserType } from '../../../Components/signup-user-type/signup-user-type.component';
export const DashboardBody = ({contests, templates, todo, recent, brandname, currentUser}) =>{
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
            <Switch>
                <Route exact path='/dashboard' render={()=> currentUser ? (<Redirect to='/'/>) : (
                    <DashboardHomePage 
                        contests={contests} 
                        templates={templates} 
                        todo={todo} 
                        recent={recent} 
                        brandname={brandname}
                        currentUser={currentUser}
                    />)} 
                />
                <Route exact path='/dashboard/My Contests' render={()=> currentUser ? (<Redirect to='/'/>) : (
                    <DashboardContestPage 
                        contests={contests}
                    />)}
                />
                <Route exact path='/dashboard/Templates' render={()=> currentUser ? (<Redirect to='/'/>) : (
                    <DashboardTemplatesPage 
                        templates={templates}
                    />
                )} />
                <Route exact path='/dashboard/My Contests/new' render={()=> currentUser ? (<Redirect to='/'/>) : (
                    <Redirect to={"/dashboard/My Contests/new/firstStep"} />
                )} />
                <Route exact path='/dashboard/My Contests/new/:step' render={()=> currentUser ? (<Redirect to='/'/>) : (
                    <NewContest />
                )} />
            </Switch>
        </div>
    )
}