import React from "react"
import { Route, Switch, Redirect, useLocation } from "react-router-dom"
import { Dashboard_ContestPage } from "./contestspage.component"
import { Listwithimages } from "./datalist.component"
import { Dashboard_FirstPage } from "./homepage.component"
import { NewContest } from "./newcontest.component"
import { Dashboard_TemplatesPage } from "./templatespage.component"
export const Dashboard_Body = ({contests, templates, todo, recent, brandname, currentUser}) =>{
    var location = useLocation()
    return(
        <div className="columns is-multiline is-variable is-1-tablet is-2-desktop dashboard_Body">
            <div className="column is-full big_title">
                Dashboard
            </div>
            <Switch>
                <Route exact path='/dashboard' render={()=> currentUser ? (<Redirect to='/'/>) : (
                    <Dashboard_FirstPage 
                        contests={contests} 
                        templates={templates} 
                        todo={todo} 
                        recent={recent} 
                        brandname={brandname}
                        currentUser={currentUser}
                    />)} 
                />
                <Route exact path='/dashboard/My Contests' render={()=> currentUser ? (<Redirect to='/'/>) : (
                    <Dashboard_ContestPage 
                        contests={contests}
                    />)}
                />
                <Route exact path='/dashboard/Templates' render={()=> currentUser ? (<Redirect to='/'/>) : (
                    <Dashboard_TemplatesPage 
                        templates={templates}
                    />
                )} />
                <Route exact path='/dashboard/My Contests/new' render={()=> currentUser ? (<Redirect to='/'/>) : (
                    <NewContest />
                )} />
            </Switch>
        </div>
    )
}