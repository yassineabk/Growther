import React, { Component } from "react"
import {Switch ,Route,Redirect, useParams} from 'react-router-dom'
import { Dashborad_sideBar } from "../../Components/dashboard/sideBar.component"
import { Dashboard_Body } from "../../Components/dashboard/body.component"

class Dashboard extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return(
            <div className="is-flex is-flex-direction-row">
                <Dashborad_sideBar />
                <Dashboard_Body currentUser={this.props.currentUser} />
            </div>
        )
    }
}
export default Dashboard;