import React, { useEffect } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { DashboardContestPage } from "../../contest/contests-page/contests-page.component"
import { DashboardHomePage } from "../home-page/home-page.component"
import { NewContest } from "../../contest/new-contest/new-contest.component"
import { DashboardTemplatesPage } from "../templates-page/templates-page.component"
import { EditContest } from "../../contest/edit-contest/edit-contest.component"
import { useDispatch, useSelector } from "react-redux"
import { DashboardGetData } from "../../../redux/dashboard/dashboard-actions"
export const DashboardBody = ({templates, todo, recent, brandname, currentUser}) =>{
    var showSideBar = ()=>{
        document.getElementById("sideBar").classList.toggle("showSideBar")
    }
    var { contests, error } = useSelector(state => state.dashboard)
    var dispatch = useDispatch()
    useEffect(()=>{
        DashboardGetData(dispatch)
    }, [dispatch])
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
                        contests={Array.isArray(contests) ? contests.slice(0,3) : contests} 
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
                <Route exact path='/dashboard/My Contests/:id/edit' render={()=> currentUser ? (<Redirect to='/'/>) : (
                    <EditContest />
                )}/>
            </Switch>
        </div>
    )
}