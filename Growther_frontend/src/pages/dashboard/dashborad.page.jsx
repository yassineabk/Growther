import React, { Component } from "react"
import { DashboradSideBar } from "../../Components/dashboard/side-bar/side-bar.component"
import { DashboardBody } from "../../Components/dashboard/body/body.component"

class Dashboard extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return(
            <div className="is-flex is-flex-direction-row">
                <DashboradSideBar />
                <DashboardBody currentUser={this.props.currentUser} />
            </div>
        )
    }
}
export default Dashboard;